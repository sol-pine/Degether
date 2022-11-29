import React, {useEffect} from "react";
import {useDispatch} from "react-redux";
import {useNavigate} from "react-router-dom";
import ProjectInput from "../components/ProjectInput";
import ProjectDetail from "../components/ProjectDetail";
import {setCreate} from "../redux/modules/ModalSlice";

const CardModal = ({create}) => {
    const dispatch = useDispatch();
    const navigate = useNavigate();

    useEffect(() => {
        document.body.style.cssText = `
    position: fixed; 
    top: -${window.scrollY}px;
    overflow-y: scroll;
    width: 100%;`;
        return () => {
            const scrollY = document.body.style.top;
            document.body.style.cssText = "";
            window.scrollTo(0, parseInt(scrollY || "0", 10) * -1);
        };
    }, []);

    return (
        <div
            className="modal-background"
            onClick={() => {
                create ? dispatch(setCreate(false)) : navigate("/")
            }}
        >
            <div className="card-modal-body" onClick={(e) => e.stopPropagation()}>
                {create ? <ProjectInput/> : <ProjectDetail/>}
            </div>
        </div>
    )
}

export default CardModal;
