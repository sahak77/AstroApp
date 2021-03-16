import React, { useEffect, useState } from 'react';
import './App.css';
import { useForm } from 'react-hook-form';

let lastdata;
let count = 0;

let edit = false;
function App() {
  const { register, handleSubmit } = useForm()
  const [data, setData] = useState([])

  const subButton = (data) => {
    addData(data)
    document.getElementById("title").value = ""
    document.getElementById("content").value = ""
    document.getElementById("imgUrl").value = ""
  }
  const subeditButton = (data) => {
    editData(data)
    document.getElementById("title").value = ""
    document.getElementById("content").value = ""
    document.getElementById("imgUrl").value = ""
  }

  useEffect(
    () => {
      fetchData()
    }
  )
  const fetchData = async () => {
    const res = await fetch('https://finalproject-26ad5.firebaseio.com/news.json')
    const fetchedData = await res.json()
    if (fetchedData) {
      const apartaments = Object.keys(fetchedData).map(key => {
        return {
          id: key,
          ...fetchedData[key]
        }
      })
      setData(apartaments)
    }
  }

  const addData = async (apartament) => {
    const res = await fetch('https://finalproject-26ad5.firebaseio.com/news.json', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ ...apartament })
    })
    const data = await res.json()
    console.log(data);
  }

  const deleteItem = async (id) => {
    const response = await fetch(`https://finalproject-26ad5.firebaseio.com/news/${id}.json`, {
      method: 'DELETE',
      headers: { 'Content-Type': 'application/json' }
    })
    const data = await response.json()
    console.log(data);
  }

  const editItem = async (data) => {
    edit = true;
    document.getElementById("id").value = data.id
    document.getElementById("title").value = data.title
    document.getElementById("content").value = data.content
    document.getElementById("imgUrl").value = data.imgUrl
  }

  const editData = async (id) => {
    console.log(id)
    const response = await fetch(`https://finalproject-26ad5.firebaseio.com/news/${id.id}.json`, {
      method: 'PUT',
      body: JSON.stringify({
        title: document.getElementById("title").value,
        content: document.getElementById("content").value,
        imgUrl: document.getElementById("imgUrl").value,
        id: document.getElementById("id").value,
      }),
      headers: { 'Content-Type': 'application/json' }
    })
    const data = await response.json()
    if (data) {
      window.location.reload(false);
    }
    edit = false;
  }

  lastdata = [...data].reverse();

  return (
    <div className="App">
      <div className="form">
        {edit
          ? <form onSubmit={handleSubmit(subeditButton)} className="form">
            <input type="hidden" id="id" name="id" ref={register} />
            <input type="text" placeholder="title" id="title" name="title" />
            <input type="text" placeholder="imgUrl" id="imgUrl" name="imgUrl" ref={register} />
            <textarea type="text" placeholder="content" id="content" name="content" ref={register}></textarea>
            <input type="submit" value="edit" />
          </form>
          : <form onSubmit={handleSubmit(subButton)} className="form">
            <input type="hidden" id="id" name="id" />
            <input type="text" placeholder="title" id="title" name="title" ref={register} />
            <input type="text" placeholder="imgUrl" id="imgUrl" name="imgUrl" ref={register} />
            <textarea type="text" placeholder="content" id="content" name="content" ref={register}></textarea>
            <input type="submit" value="add" />
          </form>
        }

      </div>
      <div className="info">
        <table>
          <thead>
            <tr>
              <th>title</th>
              <th>description</th>
              <th>image</th>
              <th>delete</th>
              <th>edit</th>
            </tr>
            {
              lastdata.map(v => {
                return (
                  <tr key={v.id}>
                    <td>{v.title}</td>
                    <td>{v.content}</td>
                    <td><img src={v.imgUrl} alt="" height='100' /></td>
                    <td><button onClick={() => deleteItem(v.id)}>delete</button></td>
                    <td><button onClick={() => editItem(v)}>edit</button></td>
                  </tr>
                )
              })
            }
          </thead>
        </table>
      </div>
    </div>
  );
}

export default App;














// import React from 'react';
// import firebase from 'firebase';

// function App() {

//         // To Configure react native app with cloud of Google Firebase database !
//         var config = {
//             databaseURL: "https://finalproject-26ad5.firebaseio.com/",
//             projectId: "finalproject-26ad5",
//         };
//         firebase.initializeApp(config);

//         // To select data from firebase every time data has changed !
//         firebase.database().ref('news').on('value', (data) => {
//             console.log(data.toJSON());
//         })

//         // To Await 5 seconds to insert a new user
//         setTimeout(() => {
//             firebase.database().ref('news/-M5pp2PPwzwNQ4Cn7gVU').set(
//                 {
//                     title: 'Pheng Sengvuthy 004',
//                     content: 24
//                 }
//             ).then(() => {
//                 console.log('INSERTED !');
//             }).catch((error) => {
//                 console.log(error);
//             });
//         }, 5000);

//         // To Update a user
//         const update = async () => {


//         firebase.database().ref('news/-M5pp2PPwzwNQ4Cn7gVU').update({
//             title: 'Pheng Sengvuthy'
//         });

//         // To Remove a user
//         firebase.database().ref('news/-M5pp2PPwzwNQ4Cn7gVU').remove();
//       }


//         return (
//             <div>
//               <input type="submit" onClick={() => update()} />
//             </div>
//         )
//     }

// export default App;