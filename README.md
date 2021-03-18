# trell1

## 트렐로 만들기

## 1.라우터 설정
- 가장 먼저 라우터 설정해준다
- 참고로 주소가 있으려면 컴포넌트가 있어야 한다

## 2.api 파일 만들어 비동기 처리..
- 유의할점
cors 에러로 서로 다른 localhost 번호에
요청을 하면 발생하는 것으로 
서버쪽에서 cors 라이브러리를 이용해
허용해준다...

- 주의할것이 주소기입잘하기!
(로컬호스트 주소를 잘못기입해 다른 포트로 요청을 보내 cors 에러가 발생했다)

## 3. api axios에 대해서..
-axios로 받은 데이터는 기본적으로 promise이기 때문에 then를 할수 있고 기본적으로 return 를 왠만하면 해주는게 좋다
```js
axios.get('/login',data)
//이런식으로도 가능하지만 아래로도 가능
axios({
    url, //주소
    method, //get,post,put,delete fetch
    data
})
```

-여기서는 이런식으로도 작성가능하다

```js
const LoginUser=(data)=>{
    return instance.post('login',data)
}
```
-모듈화할수 있다
```js
//이런식으로 모듈화해서
const request=(url,method,data)=>{
    return instance({
        url,
        method,
        data
    })
};
//종류대로꺼내올수있게끔
export const auth={
    login(email,password){
        return request('login','post',{email,password})
    }
}
```
## 4. 로컬스토리지에 저장하는 로그인 과정

1. 로그인 api에 대이터를 보낸다
2. 로컬스토리지에 저장한다(여기서는 accesstoken를 저장함)
3. 새로고침하면 날라가니 재할당을 해주어야한다
4. 인증을 확인하기위해 헤더에 Authorization를 같이 보내준다

## 5. 배경색 api에서 가져와서 적용시키는 두가지 방법
```html
 <li  v-for="board in boardList" :key="board.id">
    <router-link :to="`/b/${board.id}`" :style="`background-color:${board.bgColor}`">
            <div class="board-titel">{{board.title}}</div>
    </router-link>
</li>
```
- api자체에서 기본 bgColor 가지고 있으니
바운딩 시켜줘서 패치할때 적용시키도록 했다
```js
    updated(){
        this.$refs.boardItem.forEach(el => {
            el.style.backgroundColor=el.dataset.bgcolor
        });
    },
```

## 6.가져올 객체 파악하기
- board/id =>lists=>cards

```html
      <board-list v-for="list in board.lists" :list="list" :key="list.id" ></board-list>
      <!-- 어차피 컴포넌트에 for문 돌려서 넘겨줘도 프롭스로 내려주지않으면 의미없다 -->
```

## 7.if문으로 요소가 생겼을 때 포커스 안먹히면
```js
  mounted(){
    this.$refs.input.focus();
  }

      onClickTitle(){
      this.isEditTitle=true;
      this.$ref.input.focus()
    }
  //focus를 읽을수없다고 인식하지못한다
//그래서 아래와 같은 방법을 쓴다


//mounted는 모든 자식 컴포넌트가 마운트 된 상태를 보장하지 않습니다. mounted 내부에서 vm.$nextTick를 사용하면 전체가 렌더링된 상태를 보장합니다.
    onClickTitle(){
      this.isEditTitle=true;
      this.$nextTick(()=>this.$refs.inputTitle.focus())
    }

```

## 8.데이터를 수정할때도 데이털르 보내주어야한다
- state에 저장된 값이 변하면 자동으로 랜더링된다는 것을 잘 생각하자
- 보통 get으로 가져온 데이터를 state에 저장해준다
- 브라우저에서 vuex확인은 mutations로 확인가능하니 잘보자!
- update할때 state값도 같이 바꾸어주어야한다 
- 데이터가 state에 저장되어있을 경우
1. 서버쪽 api 호출해 데이터를 수정한다
2. 서버쪽데이터를 업데이트 시켜주어야한다
3. 항상 유념! state를 건드려야 화면에 렌더링 되기 때문에
4. 화면에 패치시켜주는 api나 state를 건드리는 mutations을 꼭 호출해야한다

## 9데이터를 전송할때는 from 요소에서 submit를 잘 쓰자

## 10. 데이터의 위치를잘보자.. 보드리스트와 그냥 리스트 색깔넣는거 헷갈렷음

## 11 addCard 부분 잘 보기 제에발 오타주의

## 12 value를 바인딩해주고 v-model해주면 충돌난다..하나만 쓰도록 하자

## 13 주의할것
- 여기서 board와 board안의 card를 따로 저장했었다
- 서버에서 api를 호출해 데이터를 바꿔줫으면
- 화면에 변화한 데이터를 랜더링 해주기위해 fetch로 데이터를 가져와 mutations를 실행시켜 state값를 바꾸어주었다
다만 각각 다르게 저장되어있기때문에 아무리 card가 board에 있는 값을 추출햇더라고 별개의 값이므로 board만 state를 바꾸어 주었으면  card의 값은 그대로이다
이거진짜 주의!!

## 14 두가지 방법
1. v-if 조건문으로 input과 그냥 태그로만들어 구분해주던가
2. input 하나가지고 readonly 속성을 이용하던가 해주기

## 15. 
```js
      console.log('제대로가져왓는지확인',this.$el.querySelectorAll(".card-wrapper"))
      console.log('제대로가져왓는지확인222',document.querySelectorAll(".card-wrapper"))
      //결론두개다 유사배열로 같은 값을 가져왓다
```

## 16. 리팩토링
```js
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
```

## 17. navbar 같은 경우 같은 컴포넌트를 공유하는데 특정 주소?에서만 색깔이 달라진다 그래서 state에 따로 저장되어 컨트롤

## 18. watch값이든 뭐든 state가 어디서든지 변화면 watch 호출
```js
    watch:{
        'bodyColor':'updateTheme'
    },
```
