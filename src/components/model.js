
import { useDispatch, useSelector } from "react-redux";
import Modal from "./Modal";

const Models = function (props) {
  //   const dispatch = useDispatch();
  const models = useSelector((state) => state.modelData);
  console.log("moddeldata",models)
  return models?.map((data) => {
    return <Modal object={data} />;
  });
};
export default Models;
