import React, {useState, useEffect} from 'react'
import axios from 'axios';
import "./Display.css";

const Display = () => {
    let [list,setList] = useState({type:"",action:""})
    let [display,setDisplay] = useState([]);
    let [tpage,setTpage] = useState([1])
    let [page,setPage] = useState(1)
    let [size,setSize] = useState(4)
    useEffect(()=>{
        // console.log(type,action,page)
         getData();
    },[list,page])
    const getData = () =>
    {
        let {type,action} = list;
        setDisplay([]);
        console.log(page,display)
        axios.get(`https://charlie-p.herokuapp.com/api/products/?${type}=${action}&page=${page}&size=${size}`)
        .then((res)=>{
            let {data,totalPage,} = res.data;
            console.log(res)
            var arr = new Array(totalPage).fill().map((_, i) => i+1);
            
            setTpage(arr)
            
            setDisplay(data);
        })
    }
  return (
            <div>
                <div style={{display : 'flex',margin: '10px 30%',justifyContent: 'space-between'}}>
                    <div className="dropdown">
                        <button className="btn btn-secondary dropdown-toggle" type="button" id="dropdownMenuButton1" data-bs-toggle="dropdown" aria-expanded="false">
                            Sort By Price
                        </button>
                        <ul className="dropdown-menu" aria-labelledby="dropdownMenuButton1">
                            <li onClick={() =>setList({type:"price",action:"asc"})}><a className="dropdown-item" href="#">Ascending</a></li>
                            <li onClick={() =>setList({type:"price",action:"desc"})}><a className="dropdown-item" href="#">Descending</a></li>
                        </ul>
                    </div>
                    <div className="dropdown">
                        <button className="btn btn-secondary dropdown-toggle" type="button" id="dropdownMenuButton1" data-bs-toggle="dropdown" aria-expanded="false">
                            Sort By title
                        </button>
                        <ul className="dropdown-menu" aria-labelledby="dropdownMenuButton1">
                            <li onClick={(e) =>setList({type:"title",action:"asc"})}><a className="dropdown-item" href="#">Ascending</a></li>
                            <li onClick={(e) =>setList({type:"title",action:"desc"})}><a className="dropdown-item" href="#">Descending</a></li>
                        </ul>
                    </div>
                    <div className="dropdown">
                        <button className="btn btn-secondary dropdown-toggle" type="button" id="dropdownMenuButton1" data-bs-toggle="dropdown" aria-expanded="false">
                            Sort By Category
                        </button>
                        <ul className="dropdown-menu" aria-labelledby="dropdownMenuButton1">
                            <li onClick={(e) =>setList({type:"category",action:"women's clothing"})}><a className="dropdown-item" href="#">Womens's Clothing</a></li>
                            <li onClick={(e) =>setList({type:"category",action:"men's clothing"})}><a className="dropdown-item" href="#">Mens's Clothing</a></li>
                            <li onClick={(e) =>setList({type:"category",action:"electronics"})}><a className="dropdown-item" href="#">Electronics</a></li>
                            <li onClick={(e) =>setList({type:"category",action:"jewelery"})}><a className="dropdown-item" href="#">Jewelery</a></li>
                        </ul>
                        <button onClick={() =>{setList({type:"",action:""});setDisplay([]); getData();}}>
                            Reset
                        </button>
                    </div>
                </div>
                <div  style={{ display: 'grid', gridTemplateColumns: 'auto auto auto',  backgroundColor: '#2196F3',
                gridGap: '20px',
                padding: '10px'}}>
                    {display.map((el)=>{
                        return (
                            <div key={el._id} style={{width: '200px'}}>
                                <div >
                                    <img src={el.image} alt="abc" width="180px" height="180px"/>
                                    <p>{el.title}</p>
                                    <span>
                                        <p>Category :{el.category}</p>
                                        <p>price :{el.price}</p>
                                    </span>
                                    
                                </div>
                          </div>
                        )
                    })}
                    
                </div>
                <div className="pagination">
                <a href="#">&laquo;</a>
                    {tpage.map((el)=>{
                        return (
                            <div key={el}>
                                <a className={page === el ? 'active' : 'inactive'} href="#" onClick={() => setPage(el)}>{el}</a>
                            </div>
                        )
                    })}
                <a href="#">&raquo;</a>
                    </div>
            </div>
  )
}

export default Display