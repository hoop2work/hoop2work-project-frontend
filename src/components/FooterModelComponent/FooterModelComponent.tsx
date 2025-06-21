import React from "react";

const Footer: React.FC = () => (
    <footer
        className="
            w-full
            text-center
            font-[Indie_Flower,cursive]
            text-[14px]
            text-[#222]
            leading-[1.3]
            border-t
            border-black
            p-[10px]
            fixed
            left-0
            bottom-0
            bg-[#dddddd]
            z-[100]
        "
    >
        <div className="mb-[7px]">
            This site is created for demonstrative purposes only and does not offer<br />
            any real products or services.
        </div>
        <div>
            Hoop2Work 2025
        </div>
    </footer>
);

export default Footer;