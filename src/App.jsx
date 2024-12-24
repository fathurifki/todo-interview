import { useEffect, useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css'
import axios from 'axios'
import BasicModal from './Modal'

/**
 * 
 * Buat aplikasi yang menampilkan List Data sederhana:
1. Implementasikan state management dalam aplikasi yang dibuat
2. Data diambil dari endpoint https://jsonplaceholder.typicode.com/posts
3. Dari endpoint tersebut hanya 2 field yang ditampilkan yaitu { id, title }
4. Buatlah fitur detail view ketika item dari list data tersebut ditekan akan menampilkan halaman detail berisikan { userId, id, title, body }
5. Buatlah fitur search “title” dari list data tersebut
 */

function App() {
  const fetchUrl = "https://jsonplaceholder.typicode.com/posts"
  const [state, setState] = useState({
    list: [],
    detail: {},
    loading: false,
    modal: false,
    id: null,
    search: '',
  })

  const fetching = async () => {
    const res = axios.get(fetchUrl).then(function (response) {
      // handle success
      if (response.status === 200) {
        setState((prev) => ({
          ...prev,
          list: response.data
        }))
      }
    })
      .catch(function (error) {
        // handle error
        return error
      })

    return res
  }

  const fetchingDetail = () => {
    const res = axios.get(`${fetchUrl}/${state.id}`).then(function (response) {
      // handle success
      if (response.status === 200) {
        setState((prev) => ({
          ...prev,
          detail: response.data
        }))
      }
    })
      .catch(function (error) {
        // handle error
        return error
      })

    return res
  }

  const handleModal = (value) => {
    setState((prev) => ({
      ...prev,
      modal: !state.modal,
      id: value
    }))
  }

  useEffect(() => {
    fetching()
  }, [])

  useEffect(() => {
    fetchingDetail()
  }, [state.id])

  useEffect(() => {
    const filter = state.list.filter((value) => value.title === state.search)
    if (state.search !== '') {
      setState((prev) => ({
        ...prev,
        list: filter
      }))
    } else {
      fetching()
    }
  }, [state.search])

  /** if have much time */
  // const handleModal = (value) => {
  //   setState((prev) => ({
  //     ...prev,
  //     modal: !state.modal,
  //   }))
  // }

  /** if have much time */
  // const hanldeDetail = (value) => {
  //   setState((prev) => ({
  //     ...prev,
  //     id: value,
  //     modal: !state.modal,
  //   }))
  // }



  return (
    <div>
      {/* <BasicModal detail={state.detail} openModal={state.modal} setModal={handleModal} /> */} /** if have much time */
      <input onChange={(e) => setState((prev) => ({
        ...prev,
        search: e.target.value
      }))} />
      <div style={{ display: 'flex', flexDirection: 'column' }}>
        <table>
          <tr>
            <th>ID</th>
            <th>Title</th>
            <th>Action</th>
          </tr>
          <tr>
            {
              state.list.map((v) => (
                <div style={{ display: 'flex' }}>
                  <td>{v.id}</td>
                  <td>{v.title}</td>
                  <BasicModal detail={state.detail} setModal={() => handleModal(v.id)} openModal={state.modal} />
                  {/* <button onClick={() => hanldeDetail(v.id)}>Detail</button> */}
                </div>
              ))
            }
          </tr>

        </table>

      </div>
    </div>
  )
}

export default App
