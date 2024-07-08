import Navbar from './components/navbar';
import Cards from './components/cards';
import Waitlist from './components/waitlist';
import 'bootstrap/dist/js/bootstrap.bundle.min';
import 'bootstrap/dist/css/bootstrap.min.css';
import './components/cards.css';
 
function App() {
  return (
    <div>
      <Navbar />
      <Cards />
      <Waitlist />
    </div>
  );
}
export default App











// const App = () => {
//   const[music, setMusic] = useState([]);
//   const getMusic = async() =>{
//     const url = `https://spotify23.p.rapidapi.com/search?q=${encodeURIComponent('getMusic')}&type=multi&offset=0&limit=10&numberOfTopResults=5`;
// const options = {
// 	method: 'GET',
// 	headers: {
// 		'x-rapidapi-key': 'dca902b7aamsh9eff17501c50385p1881b3jsn82265181d4b8',
// 		'x-rapidapi-host': 'spotify23.p.rapidapi.com'
// 	}
// };

// try {
// 	const response = await fetch(url, options);
// 	const result = await response.json();
// 	setMusic(result);
// } catch (error) {
// 	console.error(error);
// }
//   }
//   useEffect(() => {
//     getMusic()   

//   },[]);
//   return(
//     <div>
//       {music?.topResults?.items?.map((item) => (
//         <div key={item.id}>
//           <h1>{item.name}</h1>
//         </div>

//       ))}
//     </div>
//   )
// }
// export default App;
