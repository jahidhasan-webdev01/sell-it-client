import React from 'react';
import { FaGoogle } from 'react-icons/fa';

const GoogleLogin = () => {
    return (
        <div>
            <button
                className="w-full btn btn-primary rounded-full"
                variant="outline"
            >
                <FaGoogle />
                Log in with Google
            </button>
        </div>
    );
};

export default GoogleLogin;