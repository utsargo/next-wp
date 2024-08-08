const trimExcerpt = (html: string, maxLength: number) => {
    if (typeof document === 'undefined') {
      // Server-side fallback
      return html.length > maxLength ? html.slice(0, maxLength) + "..." : html;
    }
  
    const div = document.createElement("div");
    div.innerHTML = html;
    const text = div.textContent || div.innerText || "";
    return text.length > maxLength ? text.slice(0, maxLength) + "..." : text;
  };
  
  export default trimExcerpt;
  