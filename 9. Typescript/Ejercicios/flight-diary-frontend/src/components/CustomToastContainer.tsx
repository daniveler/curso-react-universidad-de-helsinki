import { ToastContainer } from "react-toastify"

const CustomToastContainer = () => {
  return <ToastContainer 
    position="bottom-right"
    autoClose={10000}
    hideProgressBar
    newestOnTop={false}
    closeOnClick
    rtl={false}
    pauseOnFocusLoss
    draggable
    pauseOnHover
    theme="colored">

  </ToastContainer>
} 

export default CustomToastContainer