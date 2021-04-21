//diferenças entre consumo de APis com Next
//SPA
  /*{  useEffect(()=>{
    fetch('http://localhost:3333/episodes')
    .then(response => response.json())
    .then(data => console.log(data));
  },[]) 

}*/
  //SSR
/*{ 
export async function getServerSideProps() {
 
  const response = await fetch('http://localhost:3333/episodes');
  const data = await response.json()

    return{
      //puxando oque eu quero da API 
      //se eu repassar props como parametro sera repassado tudo que eu escrever e puxar em props{}
        props:{
          episodes:data,
        }
    }
}
}*/
//SSG

export default function Home(props){
  //like THIS
  console.log(props.episodes)
  return(
    <h1>Index</h1>
  )
}


export async function getStaticProps() {
 
  const response = await fetch('http://localhost:3333/episodes');
  const data = await response.json()

    return{
     
        props:{
          episodes:data,
        
        },
        revalidate:60 *60 * 8,
    }
}
