import React, {useEffect, useState} from "react";

let initialUserData = {
    username: "",
    email: "",
    phone: "",
    gender: "",
    hobby: [],
    city: ""
};
const Home = () => {
    const [tableData, setTableData] = useState([]);
    const [UserData, setUserData] = useState(initialUserData);
    const [Edit, setEdit] = useState(false);
    const[indexValue,setIndexValue]=useState("");

    useEffect(() => {
        let array = JSON.parse(localStorage.getItem('listsItems'));
        setTableData(array);
    }, []);

    function handleAddTask() {
        if (indexValue !== ""){
            // console.log("Here in if due to index");
            let array = tableData;
            array.splice(indexValue,1,UserData);
            // console.log("-----------------------",array);
            setTableData([...array]);
            localStorage.setItem('listsItems', JSON.stringify(array));
            setIndexValue("");
            setEdit(false);
            resetData();
        }else{
            let array = JSON.parse(localStorage.getItem('listsItems')) || [];
            array.push(UserData);
            setTableData(array);
            localStorage.setItem('listsItems', JSON.stringify(array));
            setUserData((preState)=>({...preState,...initialUserData}));
            resetData();
        }
    }

    const removeHandler = (id) => {
        let tempArray = tableData;
        tempArray.splice(id,1);
        setTableData(()=>([...tempArray]));
        localStorage.setItem('listsItems', JSON.stringify(tempArray));
        // alert("do you want to delete this filed");
    };

    const resetData = () => {
        setUserData(
            {
                username: "",
                email: "",
                phone: "",
                gender: "",
                hobby: [],
                city: ""
            }
        );

        document.getElementsByName('gender').forEach((item)=>{
            // console.log('++++++++++++++', document.getElementById(item.id));
            // console.log("id ---- ",item.id);
            document.getElementById(item.id).checked = false;
        });

        document.getElementsByName('hobby').forEach((item)=>{
            // console.log('++++++++++++++', document.getElementById(item.id));
            // console.log("id ---- ",item.id);
            document.getElementById(item.id).checked = false;
        });
    };

    const editHandler = (index) => {
        setEdit(true);
        setIndexValue(index);
        let editData = JSON.parse(localStorage.getItem('listsItems'));
        // console.log("editData[index] - - - -",editData[index]);

        setUserData({
            username: editData[index].username,
            email: editData[index].email,
            phone: editData[index].phone,
            gender: editData[index].gender,
            hobby: editData[index].hobby,
            city: editData[index].city
        },[]);
    };

    const dataChange = (e) => {
        const {name, value} = e.target;
        setUserData({
            ...UserData,
            [name]: value
        });
    };

    const handelHobbyValue = (e) => {
        let value = UserData.hobby || [];
        if (e.target.checked) {
            value.push(e.target.value);
        } else {
            value = UserData.hobby.filter((item) => item !== e.target.value);
        }
        setUserData((preState) => ({
            ...preState,
            hobby: value,
        }))
    };
    return (
        <>
            <div className="container col-sm-10 py-md-4 text-center" id="form">
                <div>
                    <h1>  :Login Form: </h1>
                    <div className="ui dropdown-divider"></div>
                    <div className="ui form">
                        <div className="username">
                            <label> Username: </label>
                            <input type="text" name="username" placeholder="Enter Your UserName" onChange={dataChange}
                                   value={UserData.username}/> <br/>
                        </div>

                        <div className=" email mt-3">
                            <label> Email: </label>
                            <input type="text" name="email" placeholder="Enter Your Email" onChange={dataChange}
                                   value={UserData.email}/>
                        </div>

                        <div className=" phone mt-3">
                            <label> PhoneNo: </label>
                            <input type="number" name="phone" placeholder="Enter Your phoneNo" onChange={dataChange}
                                   value={UserData.phone}/>
                        </div>

                        <div className="gender mt-3">
                            <label> Gender: </label>
                            <label htmlFor="male" className="radio">
                                <input
                                    type="radio"
                                    name="gender"
                                    value="male"
                                    onChange={dataChange}
                                    checked={UserData.gender === 'male' ? true : false}
                                    id='male'
                                />
                                Male </label>
                            <label htmlFor="female" className="radio">
                                <input
                                    type="radio"
                                    name="gender"
                                    value="female"
                                    onChange={dataChange}
                                    checked={UserData.gender === 'female' ? true : false}
                                    id='female'
                                />
                                Female
                            </label>
                            <label htmlFor="other" className="radio">
                                <input
                                    type="radio"
                                    name="gender"
                                    value="other"
                                    onChange={dataChange}
                                    checked={UserData.gender === 'other' ? true : false}
                                    id='other'
                                />
                                Other
                            </label> <br/>
                        </div>

                        <div className="field mt-3">
                            <label> Hobby: </label>
                            <label htmlFor="reading" className="checkbox"><input type="checkbox" name="hobby"
                                                                                 value="reading"
                                                                                 onChange={handelHobbyValue}
                                                                                 checked={UserData && UserData?.hobby?.filter((e) => (e === "reading"))[0] === 'reading' ? true : false}
                                                                                 id='reading'
                            /> Reading
                            </label>
                            <label htmlFor="writing" className="checkbox"><input type="checkbox" name="hobby"
                                                                                 value="writing"
                                                                                 onChange={handelHobbyValue}
                                                                                 checked={UserData && UserData.hobby.filter((e) => (e === "writing"))[0] === 'writing' ? true : false}
                                                                                 id='writing'
                            /> Writing
                            </label>
                            <label htmlFor="dancing" className="checkbox"><input type="checkbox" name="hobby"
                                                                                 value="dancing"
                                                                                 onChange={handelHobbyValue}
                                                                                 checked={UserData && UserData.hobby.filter((e) => (e === "dancing"))[0] === 'dancing' ? true : false}
                                                                                 id='dancing'
                            /> Dancing
                            </label>
                            <label htmlFor="traveling" className="checkbox"><input type="checkbox" name="hobby"
                                                                                   value="traveling"
                                                                                   onChange={handelHobbyValue}
                                                                                   checked={UserData && UserData.hobby.filter((e) => (e === "traveling"))[0] === 'traveling' ? true : false}
                                                                                   id='traveling'
                            /> Traveling
                            </label>
                        </div>

                        <div className="field mt-3">
                            <label> City: </label>
                            <select name="city" value={UserData.city} onChange={dataChange}>
                                <option selected="">--select city--</option>
                                <option value={"surat"}>Surat</option>
                                <option value={"vapi"}>Vapi</option>
                                <option value={"vadodra"}>Vadodra</option>
                            </select>
                        </div>
                        <div className="field mt-3">
                            {/*{*/}
                            {/*    Edit ?   */}
                            <button  onClick={handleAddTask} className="btn btn-primary mr-1">{ Edit ? "Update" :  "Submit" }</button>
                            {/*//         :*/}
                            {/*//        < button onClick={handleAddTask} className="btn btn-primary mr-1"> Update </button>*/}
                            {/*// }*/}
                            {/*<button  onClick={handleAddTask} className="btn btn-primary mr-1"> Submit </button>*/}
                            <button  onClick={resetData} className="btn btn-danger">Reset</button>
                        </div>
                    </div>
                </div>
            </div>
            <div className="table container container-fluid text-center">
                <table>
                    <tr>
                        <th> No </th>
                        <th> Username</th>
                        <th> Email</th>
                        <th> PhoneNo</th>
                        <th> Gender</th>
                        <th> Hobby</th>
                        <th> City</th>
                        <th> Action</th>
                    </tr>
                    {tableData?.map((item,index,id) =>
                        <tr>
                            <td> {index+1} </td>
                            <td>{item.username}</td>
                            <td>{item.email}</td>
                            <td>{item.phone}</td>
                            <td>{item.gender}</td>
                            <td>{item.hobby}</td>
                            <td>{item.city}</td>
                            <td>
                                <button onClick={() => editHandler(index)}> Edit</button>
                                <button onClick={() => removeHandler(index)}> Delete</button>
                            </td>
                        </tr>
                    )}
                </table>
            </div>
        </>
    );
};
export default Home;


