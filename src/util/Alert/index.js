import { Button, ToastContainer, toast} from 'mdbreact';


function notify(type) {
  return () => {
    switch (type) {
      case 'info':
            console.log('called func')

        toast.info('Info message', {
          autoClose: 3000
        });
        break;
      case 'success':
        toast.success('Success message', {
          position: "top-right",
        });
        break;
      case 'warning':
        toast.warn('Warning message');
        break;
      case 'error':
        toast.error('Error message');
        break;
    }
  };
};

export default notify;