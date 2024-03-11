import { useState, useEffect, useRef } from "react";
import * as htmlToImage from 'html-to-image';
import { toPng, toJpeg, toBlob, toPixelData, toSvg } from 'html-to-image';
export default function MemeGenerator () {

  const [memes, setMemes] = useState([])
  const [currentMeme, setCurrentMeme] = useState([])
  const [topText, setToptext] = useState('')
  const [bottomText, setBottomtext] = useState('')
  const [file, setFile] = useState();
  const fileRef = useRef()

  function handleChange(e) {
      console.log(e.target.files);
      setFile(URL.createObjectURL(e.target.files[0]));
  }


  function exportMeme(){
    htmlToImage.toPng(document.getElementById('meme'))
    .then(function (dataUrl) {
      
      // download(dataUrl, 'MyMeme.png'); // https://github.com/rndme/download
      var link = document.createElement('a');
      link.download = 'my-image-name.jpeg';
      link.href = dataUrl;
      link.click();


    });
  }

  useEffect(()=>{
    const fetchMemes = (async () => {
      console.log('hello');
      try{
        const response = await fetch("https://api.imgflip.com/get_memes")
        if (!response.ok) throw new Error(response.statusText)
        const data = await response.json();
        console.log(data.data.memes)
        setMemes(data.data.memes)
        setCurrentMeme(data.data.memes[11])

      }
      catch(error){
        console.log(error)
      }
    })()
  }, [])

  function setRandomMeme(e){
    const numMemes = memes.length;
    const randomMemeNr = Math.floor(Math.random() * numMemes)
    setCurrentMeme(memes[randomMemeNr])
  }

  function resetMeme(){
    setFile(null)
    setToptext('')
    setBottomtext('')
    setCurrentMeme(memes[11])
    fileRef.current.value = null;
  }
    

  return (
<>
<h2>Talking 'bout my MemeGenerator</h2>

<div style={{position: "relative"}} id="meme">
<img src={file??currentMeme.url}  className="meme" />
  <span className="memeText">{topText}</span>
  <span className="memeText bottom">{bottomText}</span></div>
<div><button onClick={setRandomMeme}>random</button></div>
<div><label htmlFor="topText">Top Text</label>&nbsp;&nbsp;&nbsp;<input id="topText" type="text" onChange={(e)=>setToptext(e.target.value)} /></div>
<div><label htmlFor="bottomText">Bottom Text</label>&nbsp;&nbsp;&nbsp;<input id="bottomText" type="text" onChange={(e)=>setBottomtext(e.target.value)} /></div>
<div><input type="file" onChange={handleChange} id="fileInput" ref={fileRef} /></div>
<div><button onClick={exportMeme}>download</button></div>
<div><button onClick={resetMeme}>reset</button></div>
  </>

  )
}




// const res = await fetch(url,{
//   method: "POST",
//   headers: {
//     "Content-Type": 'application/json',
//   },
//   body: JSON.stringify({query})
// });