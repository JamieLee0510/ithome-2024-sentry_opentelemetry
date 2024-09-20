import React from 'react';

export default function Page02() {
    return (
        <div>
            Page02
            <button
                onClick={() => {
                    console.log(window.location.pathname);
                }}
            >
                click
            </button>
        </div>
    );
}
