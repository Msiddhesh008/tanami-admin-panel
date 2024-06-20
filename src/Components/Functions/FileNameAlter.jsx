const extractFilename = (filePath) => {
    // Use the split method to break the path into parts based on '/'
    const parts = filePath.split('/');
    // Return the last part, which is the filename
    return parts[parts.length - 1];
};

export default extractFilename  ;
