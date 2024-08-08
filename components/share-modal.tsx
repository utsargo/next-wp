'use client';
import { useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faSquareFacebook, faLinkedin, faSquareXTwitter, faWhatsappSquare } from "@fortawesome/free-brands-svg-icons";
import { faCopy, faXmark } from "@fortawesome/free-solid-svg-icons";
import Link from "next/link";

interface ShareModalProps {
  isOpen: boolean;
  onClose: () => void;
}

const ShareModal = ({ isOpen, onClose }: ShareModalProps) => {
  const shareUrl = typeof window !== "undefined" ? window.location.href : "";
  const [isCopied, setIsCopied] = useState(false);

  const handleCopyLink = () => {
    navigator.clipboard.writeText(shareUrl);
    setIsCopied(true);
    setTimeout(() => setIsCopied(false), 2000);
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
      <div className="bg-white rounded-lg p-4">
        <div className="flex justify-between items-center mb-4">
        <h2 className="text-xl m-0">Share this page</h2>
        <button
          type="button"
      title="close"
          onClick={onClose}
          className="bg-red-600 text-white px-2 py-1 rounded text-sm"
        >
          <FontAwesomeIcon icon={faXmark} />
        </button>
        </div>
        
        <div className="flex flex-row gap-4">
          <Link
            href={`https://www.facebook.com/sharer/sharer.php?u=${shareUrl}`}
            target="_blank"
            rel="noopener noreferrer"
            className="text-blue-600 rounded text-4xl"
          >
            <FontAwesomeIcon icon={faSquareFacebook} />
          </Link>
          <Link
            href={`https://twitter.com/intent/tweet?url=${shareUrl}`}
            target="_blank"
            rel="noopener noreferrer"
            className="text-blue-400 rounded text-4xl"
          >
            <FontAwesomeIcon icon={faSquareXTwitter} className="h-4" />
          </Link>
          <Link
            href={`https://www.linkedin.com/sharing/share-offsite/?url=${shareUrl}`}
            target="_blank"
            rel="noopener noreferrer"
            className="text-blue-700 rounded text-4xl"
          >
            <FontAwesomeIcon icon={faLinkedin} className="h-4" />
          </Link>
          <Link href={`https://api.whatsapp.com/send?text=${shareUrl}`}
                target="_blank"
                rel="noopener noreferrer"
                className="text-green-600 rounded text-4xl"
                >
                  <FontAwesomeIcon icon={faWhatsappSquare} className="h-4" />
                  </Link>
          <button
            onClick={handleCopyLink}
            className="bg-gray-800 text-white px-4 py-2 rounded"
          > <FontAwesomeIcon icon={faCopy} className='h-4' />
            {isCopied ? " Link Copied!" : " Copy Link"}
          </button>
        </div>
        
      </div>
    </div>
  );
};

export default ShareModal;
