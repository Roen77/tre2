import dragula from 'dragula';
import 'dragula/dist/dragula.css';

const dragger={
    init(container){
       return dragula([...container])

    },
    sibling({el,candidates,type}){
        const curId=el.dataset[type+'Id']*1;
        // const targetCard={
        //     id:el.dataset.cardId*1,
        //     pos:65535
        //   }
          let prev=null;
          let next=null;
    
         candidates.forEach((el,idx,arr)=>{
            const id=el.dataset[type+'Id']*1;
            if(id === curId){
              prev=idx>0?{
                id:arr[idx-1].dataset[type+'Id']*1,
                pos:arr[idx-1].dataset[type+'Pos']*1
                }:null;
    
                next=idx<arr.length-1?{
                   id:arr[idx+1].dataset[type+'Id']*1,
                pos:arr[idx+1].dataset[type+'Pos']*1
                }:null;
                
            }
            // if(!prev && next){
            //   targetCard.pos=next.pos/2;
            // }else if(!next && prev){
            //   targetCard.pos=prev.pos*2;
            // }else if(prev && next){
            //   targetCard.pos=(next.pos+prev.pos)/2;
            // }
        
          })
        return {prev, next}
    }//sibling

}

export default dragger;