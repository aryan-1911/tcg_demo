import { toast } from 'react-toastify';

toast.configure({
  draggable: false,
  position: toast.POSITION.TOP_CENTER,
  limit: 1,
});

export { toast as showMessage };
