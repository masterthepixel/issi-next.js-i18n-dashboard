
const Image = ({ src, alt, ...props }: any) => {
    // The test expects a specific src format, but for general testing,
    // returning the original src is sufficient.
    // The important part is to render an img tag with the correct alt text.
    return <img src={src} alt={alt} {...props} />;
};

export default Image;