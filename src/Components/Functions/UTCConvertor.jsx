export const formatDate = (dateString) => {
    const months = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];
    
    // Create a new Date object from the provided string
    const date = new Date(dateString);

    // Extract day, month, and year components
    const day = date.getDate();
    const month = months[date.getMonth()];
    const year = date.getFullYear();

    // Format the date in "DD-Mon-YYYY" format
    const formattedDate = `${day}-${month}-${year}`;

    return formattedDate;
}