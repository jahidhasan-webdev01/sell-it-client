const PageHeading = ({ title, subtitle }) => {
    return (
        <div className="mb-5">
            <h1 className="text-2xl font-bold text-base-content">{title}</h1>
            <p className="text-sm text-base-content/60">{subtitle}</p>
        </div>
    );
};

export default PageHeading;