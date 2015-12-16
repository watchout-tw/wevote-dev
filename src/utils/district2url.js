export default function district2url(area, no){
    if(no === 'N/A'){
        no = '1';
    }
    return `${area}/${no}`;
}