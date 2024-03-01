import React, { useState, useEffect } from "react";
import "../side_navbar/side_navbar.css";
import Sidebar from "../side_navbar/SideNavbar";
import { useNavigate } from "react-router-dom";


function Homepage() {
  const [data, setData] = useState([]);
  const [editData, setEditedData] = useState({});
  const [error, setError] = useState(false);
  const navigate = useNavigate();

  function handleCreate() {
    navigate("/product");
  }

  useEffect(() => {
    const token = sessionStorage.getItem("token");

    fetch("http://localhost:8080/categorypost", {
      method: "GET",
      headers: {
        Authorization: `${token}`,
      },
    })
      .then((response) => response.json())
      .then((data) => {
        setData(data.data);
      })
      .catch((error) => {
        console.error("Error fetching data:", error);
      });
      console.log(data)
  }, []);

  const handleDeletePost = (postId) => {
    const token = sessionStorage.getItem("token");
    fetch(`http://localhost:8080/categorypost/${postId}`, {
      method: "DELETE",
      headers: {
        Authorization: `${token}`,
      },
    })
      .then((response) => response.json())

      .then((data) => {
        setData((prevData) => prevData.filter((item) => item._id !== postId));
      })
      .catch((error) => console.error("Error deleting post:", error));
     
  };
  //....................................................................................
  function handleEditPost(PostId, e) {
    e.stopPropagation(false);
    setError(true);

    const postToEdit = data.find((item) => item._id === PostId);
    setEditedData({ ...editData, [PostId]: { ...postToEdit } });
  }

  const handleSaveEdit = (postId) => {
    const token = sessionStorage.getItem("token");

    fetch(`http://localhost:8080/userpost/${postId}`, {
      method: "PUT",
      headers: {
        Authorization: `${token}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify(editData[postId]),
    })
      .then((response) => response.json())
      .then((updatedRecord) => {
        setData((prevData) =>
          prevData.map((item) =>
            item._id === postId ? updatedRecord.data : item
          )
        );

        setEditedData({ ...editData, [postId]: {} });
        setError(false);
      })
      .catch((error) => console.error("Error updating post:", error));
  };
  //......................................................................................
  return (
    <div>
      <Sidebar />
      <div className="main-content">
        <div className="toolbar">
          <div className="left-section">
           
          </div>
          <div className="right-section">
            <button className="create-button" onClick={handleCreate}>
              Create
            </button>
          </div>
        </div>
        <table className="table">
          <thead className="tablehead">
            <tr>
              <th>ID</th>
              <th>Name</th>
              <th>Pack Size</th>
              <th>Category</th>
              <th>MRP</th>
              <th>Status</th>
              <th>Edit/Delete</th>
            </tr>
          </thead>
          <tbody className="tablebody">
            {data.map((item) => (
              <tr key={item._id}>
                <td>
                  {error && editData[item._id] ? (
                    <input
                      type="text"
                      value={editData[item._id].id}
                      onChange={(e) =>
                        setEditedData((prevEditData) => ({
                          ...prevEditData,
                          [item._id]: {
                            ...editData[item._id],
                            id: e.target.value,
                          },
                        }))
                      }
                    />
                  ) : (
                    item.id
                  )}
                </td>
                <td>
                  {error && editData[item._id] ? (
                    <input
                      type="text"
                      value={editData[item._id].Product_Name}
                      onChange={(e) =>
                        setEditedData((prevEditData) => ({
                          ...prevEditData,
                          [item._id]: {
                            ...editData[item._id],
                            Product_Name: e.target.value,
                          },
                        }))
                      }
                    />
                  ) : (
                    item.product_name
                  )}
                </td>
                
                <td>
                  {error && editData[item._id] ? (
                    <input
                      type="text"
                      value={editData[item._id].pack_size}
                      onChange={(e) =>
                        setEditedData((prevEditData) => ({
                          ...prevEditData,
                          [item._id]: {
                            ...editData[item._id],
                            pack_size: e.target.value,
                          },
                        }))
                      }
                    />
                  ) : (
                    item.pack_size
                  )}
                </td>
                <td>
                  {error && editData[item._id] ? (
                    <input
                      type="text"
                      value={editData[item._id].category}
                      onChange={(e) =>
                        setEditedData((prevEditData) => ({
                          ...prevEditData,
                          [item._id]: {
                            ...editData[item._id],
                            category: e.target.value,
                          },
                        }))
                      }
                    />
                  ) : (
                    item.category
                  )}
                </td>
                <td>
                  {error && editData[item._id] ? (
                    <input
                      type="date"
                      value={editData[item._id].mrp}
                      onChange={(e) =>
                        setEditedData((prevEditData) => ({
                          ...prevEditData,
                          [item._id]: {
                            ...editData[item._id],
                            mrp: e.target.value,
                          },
                        }))
                      }
                    />
                  ) : (
                    item.mrp
                  )}
                </td>
                
                <td>
                  {error && editData[item._id] ? (
                    <input
                      type="file"
                      value={editData[item._id].status}
                      onChange={(e) =>
                        setEditedData((prevEditData) => ({
                          ...prevEditData,
                          [item._id]: {
                            ...editData[item._id],
                            Status: e.target.value,
                          },
                        }))
                      }
                    />
                  ) : (
                    item.status
                  )}
                </td>
                <td>
                  {error && editData[item._id] ? (
                    <>
                      <button
                        className="signbtn"
                        onClick={() => handleSaveEdit(item._id)}
                      >
                        Save
                      </button>
                    </>
                  ) : (
                    <>
                      <img
                        src='https://s3-alpha-sig.figma.com/img/7574/37cc/88cf66dad602e19c6b0ec3a8b8c57ede?Expires=1698624000&Signature=XssVj6~tJBt1ATZVVMeZ-AEKiC9t2YSWRQt6FAPcLWvkh60Q8O8DFWQWnkYEvyXlin9HRhvDyFwQrywo2rbJTfvRJFJUZ1dLjIYIExoNOhSqP0gbXhJgpWNmfXG8snsxJMWNB-G9w7vnjjUTy8cL0N4vecODKjXi7minyaOw~-7pRcGeNAdU5cb-CtbrmIrcvlBv~lvP5SSJVygIv52GPvcM84VVM-9WO2YLr5SfCsi2x9PXUr3iTWhOmHi2Av4bsgOLbnGmx6bVdKW7MVBxoB8kbpTxx2j4zC-XEnvQZikWY8VnA20hRDjkSYgOhl2AxXJhd-~-zuZWyWgycOQsTw__&Key-Pair-Id=APKAQ4GOSFWCVNEHN3O4'
                        alt="edit"
                        onClick={(e) => handleEditPost(item._id, e)}
                        style={{
                          height: "26px",
                          width: "26px",
                          filter: "invert(50%)",
                          margin: "5px",
                        }}
                      />
                      <img
                        src='https://s3-alpha-sig.figma.com/img/ccc6/648c/f1ace7c2361fbd018621032d33dcf0f0?Expires=1698624000&Signature=mXSjLqIi1MSenOaJQlbJ-tcbk5NkG7a2t6zW5dbw8Z2Cdn-itIonBvG9fX7U9xXj-2Qwy6u0mtlmbP988CTsvLflgLcPzD5~WnJRyNjmcbi1VU1kDtrZZMmAngJvE8-B-K86zy~815lg5QLS8MbpMcUnJAiRL7acjmVfAaRW9QsvcsxlBNuMWwQ9bTk9QgLjrrNzw7vS~o5NOEzYtyKDR1bcukZzujhRDXSXvxm0ejRTxGRfGT3DS7kscU7qfF38HFWoJAZ2OM7QxjM-IGtPOCiu0px0bNOh~mc-C61C3MNtaBpAowGMuHkKpEeZuAaU8-NodWdnGiACzOhBCGPRfg__&Key-Pair-Id=APKAQ4GOSFWCVNEHN3O4'
                        alt="delete"
                        onClick={() => handleDeletePost(item._id)}
                        style={{
                          height: "26px",
                          width: "26px",
                          filter: "invert(50%)",
                        }}
                      />
                    </>
                  )}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}

export default Homepage;