import { revalidatePath, revalidateTag } from 'next/cache';
import { headers } from 'next/headers';
import { NextRequest } from 'next/server';

/**
 * Constants for HTTP Status codes.
 */
const STATUS_CODES = {
	UNAUTHORIZED: 401,
	PRECONDITION_FAILED: 412,
	INTERNAL_SERVER_ERROR: 500,
};

const { REVALIDATE_SECRET_KEY } = process.env;

if (!REVALIDATE_SECRET_KEY) {
	throw new Error('Missing REVALIDATE_SECRET_KEY environment variable');
}

export async function PUT(request: NextRequest) {
	const { paths, tags }: { paths?: string[]; tags?: string[] } =
		await request.json();

	console.log('Received paths:', paths);
	console.log('Received tags:', tags);

	const headersList = headers();
	const authorizationHeader = headersList.get('authorization');

	console.log('Authorization header:', authorizationHeader);

	if (authorizationHeader !== `Bearer ${REVALIDATE_SECRET_KEY}`) {
		console.error(`Invalid token: ${authorizationHeader}`);
		return new Response(`Invalid token`, { status: STATUS_CODES.UNAUTHORIZED });
	}

	if (!paths && !tags) {
		console.error(`Precondition Failed: Missing paths and tags`);
		return new Response(`Precondition Failed: Missing paths and tags`, {
			status: STATUS_CODES.PRECONDITION_FAILED,
		});
	}

	let revalidatePaths: string[] = [];
	let correctTags: string[] = [];

	if (paths) {
		revalidatePaths = paths.filter((path) => path.startsWith('/'));

		console.log('Filtered correct paths:', revalidatePaths);
	}

	if (tags) {
		correctTags = tags.filter((tag) => typeof tag === 'string');
		console.log('Filtered correct tags:', correctTags);
	}

	try {
		revalidatePaths.forEach((path) => {
			revalidatePath(path);
		});

		correctTags.forEach((tag) => {
			revalidateTag(tag);
		});

		console.log(
			`${new Date().toJSON()} - Paths and tags revalidated: ${revalidatePaths.join(
				', '
			)} and ${correctTags.join(', ')}`
		);

		return new Response(
			JSON.stringify({
				revalidated: true,
				message: `Paths and tags revalidated: ${revalidatePaths.join(
					', '
				)} and ${correctTags.join(', ')}`,
			}),
			{
				status: 200,
				headers: {
					'Content-Type': 'application/json',
				},
			}
		);
	} catch (err: unknown) {
		let message: string;

		if (err instanceof Error) {
			message = err.message;
		} else {
			message = 'An error occurred';
		}
		console.error('Revalidation error:', message);
		return new Response(message, {
			status: STATUS_CODES.INTERNAL_SERVER_ERROR,
		});
	}
}