import eng2cht from './eng2cht';
export default function handlePos(pos){
    if(pos === "none"){
        return "？";

    }else if(pos === "transparent"){
        return "公開透明";

    }else if(pos === "blackbox"){
        return "黑箱";

    }else{
        return eng2cht(pos);
    }
}
/* for MaXi */