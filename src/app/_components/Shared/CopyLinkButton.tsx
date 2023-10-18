import React, { useState } from "react";

interface CopyLinkButtonProps {
  link: string;
}

const CopyLinkButton: React.FC<CopyLinkButtonProps> = ({ link }) => {
  const [copied, setCopied] = useState(false);

  const handleCopy = () => {
    const inputElement = document.getElementById(
      "linkInput"
    ) as HTMLInputElement;
    inputElement.select();
    document.execCommand("copy");
    setCopied(true);
    setTimeout(() => setCopied(false), 1500);
  };

  return (
    <div className="join">
      <input
        className="join-item input input-bordered input-disabled focus:outline-none bg-transparent text-gray-600 max-w-xs"
        id="linkInput"
        type="text"
        value={link}
        readOnly
      />
      <button className="join-item btn btn-primary" onClick={handleCopy}>
        {copied ? "Copied!" : "Copy"}
      </button>
    </div>
  );
};

export default CopyLinkButton;
