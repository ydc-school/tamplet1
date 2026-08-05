import React from 'react'

export const WhatsappPOP = () => {
    const phoneNumber = '9729429766'
    const message = encodeURIComponent('get more information for yaduvanshi group of institutions')
    const whatsappUrl = `https://wa.me/${phoneNumber}?text=${message}`

    return (
        <a
            href={whatsappUrl}
            target="_blank"
            rel="noopener noreferrer"
            className='fixed z-30 left-7 bottom-7 transition-transform hover:scale-110 inline-block'
            aria-label="Contact on WhatsApp"
        >
            <svg
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 512 512"
                width="50"
                height="50"
            >
                <circle cx="256" cy="256" r="248" fill="#25D366" />
                <path
                    fill="#FFFFFF"
                    d="M256 88c-92.6 0-168 75.4-168 168 0 29.6 7.8 58.5 22.6 84l-18.5 67.8 69.4-18.2A167.2 167.2 0 0 0 256 424c92.6 0 168-75.4 168-168S348.6 88 256 88z"
                />
                <path
                    fill="#25D366"
                    d="M323.8 298.4c-4.5-2.3-26.7-13.2-30.9-14.7-4.1-1.5-7.1-2.3-10.1 2.3-3 4.5-11.6 14.7-14.2 17.7-2.6 3-5.3 3.4-9.8 1.1-26.5-13.3-43.9-23.8-61.4-54-4.6-7.9 4.6-7.4 13.2-24.6 1.5-3 .8-5.7-.4-8-1.1-2.3-10.1-24.3-13.8-33.3-3.6-8.7-7.3-7.5-10.1-7.6-2.6-.1-5.7-.1-8.7-.1s-8 1.1-12.2 5.7c-4.2 4.5-16 15.7-16 38.3s16.4 44.5 18.7 47.5c2.3 3 32.2 49.2 78 69 10.9 4.7 19.4 7.5 26 9.6 10.9 3.5 20.8 3 28.7 1.8 8.8-1.3 26.7-10.9 30.5-21.5 3.8-10.6 3.8-19.7 2.6-21.5-1.1-1.9-4.1-3-8.7-5.3z"
                />
            </svg>
        </a>
    )
}