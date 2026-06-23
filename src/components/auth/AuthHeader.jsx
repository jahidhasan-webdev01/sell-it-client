const AuthHeader = ({ title, subtitle}) => {
    return (
        <div className="text-center">
            <h2 className="text-3xl font-bold text-primary">{title}</h2>
            <p className="text-sm text-base-content/60 mt-1">{subtitle}</p>
        </div>
    );
};

export default AuthHeader;