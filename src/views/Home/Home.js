import React, { useEffect, useState }  from "react";
import "./Home.css"; 
import ContactCard from "../ContactCard/ContactCard";
import showToast from "crunchy-toast";



function Home(){
    const [contacts, setContacts] = useState([
        {
            name: 'dhanshree',
            mobile: '9856383292',
            email: 'dhanashreemahatme@gmail.com'
        },
    ]);

    const [name, setName] = useState('');
    const [mobile, setMobile] = useState('');
    const [email, setEmail] = useState('');
    const [editIndex, setEditIndex] = useState(-1);
    const [isEditMode, setIsEditMode] = useState(false);
   
    const addContact = () => {


      if(!name){
        showToast('Name is Required ','alert', 3000);
        return;
      }

      if(!email){
        showToast('Email is Required ','alert', 3000);
        return;
      }

      if(!mobile){
        showToast('Mobile number is Required ','alert', 3000);
        return;
      }
        const obj = {
            name: name,
            email: email,
            mobile:mobile
        }

        const newContacts = [...contacts, obj];

        setContacts(newContacts);
        saveToLocalStorage(newContacts);
        
        showToast('Contacts Added Successfully ','success', 3000);


        setName('');
        setEmail('');
        setMobile('');


    };

    const deleteContact = (mobileNumber) => {
        let indexToDelete = -1;
        contacts.forEach((contactDetail, index)=>{
            if(contactDetail.mobile == mobileNumber){
                indexToDelete = index;
            }
        })

        contacts.splice(indexToDelete,1);
        saveToLocalStorage(contacts);

        setContacts([...contacts]);

        showToast('Contacts Deleted Successfully','success', 3000);
    }

    const saveToLocalStorage = (contactsData) => {
        localStorage.setItem('contacts', JSON.stringify(contactsData));
    }

    const loadFromLocalStorage = () => {
        const contactsData = JSON.parse(localStorage.getItem('contacts'));

        if(contactsData){
            setContacts(contactsData);
        }
    }

    const enableEditMode = (index) => {
        const contactsData = contacts[index];

        setName(contactsData.name);
        setEmail(contactsData.email);
        setMobile(contactsData.mobile);

        setEditIndex(index);
        setIsEditMode(true);
    }

   

    const editContact = ()=> {
        const obj = {
            name: name,
            email: email,
            mobile: mobile
        }
    

    contacts[editIndex] = obj;

    setContacts([...contacts]);

    saveToLocalStorage(contacts);

    showToast('Contact Edited Successfully', 'success', 3000);

    setName('');
    setMobile('');
    setEmail('');

    setIsEditMode(false);
}

    useEffect(()=>{
        loadFromLocalStorage();
    })

    
    return(
        <div>
            <h1 className="app-title">☎️ Contact App</h1>

            <div className="App-body">

                <div className="show-contact">
                    <h2 className="sub-heading">Show Contacts</h2>
                    {
                        contacts.map((contact, index)=>{
                            const {name, mobile, email} = contact;
                            return(
                                <ContactCard 
                                key={index}
                                name = {contact.name }
                                mobile={ contact.mobile}
                                email={contact.email}
                                deleteContact={deleteContact}
                                enableEditMode={enableEditMode}
                                index={index}/>
                                
                            )
                        })
                    }

                </div>
                <div className="add-contact-container">
                    <h2 className="sub-heading">
                        {isEditMode ? 'Edit Contact' : 'Add Contact'} 
                    </h2>
                    <form>
                        
                        <input 
                        type="text" 
                        placeholder="Name"
                         className="user-input" 
                         onChange={(e)=>{
                            setName(e.target.value)
                         }}
                         value={name}
                           
                         />

                        <input
                        type="email"
                        placeholder="Email"
                        className="user-input"
                        onChange={(e)=>{
                        setEmail(e.target.value)
                         }}
                         value={email}
                         />

                        <input 
                         type="text"
                         placeholder="Mobile" 
                         className="user-input"
                         onChange={(e)=>{
                        setMobile(e.target.value)
                         }}
                         value={mobile}
                         />

                        <button
                        type="button"
                        className="btn-add-contact"
                        onClick={()=>{
                            isEditMode ? editContact() : addContact()
                        }} >
                             {isEditMode ? 'Edit Contact' : 'Add Contact'}
                        </button>

                    </form>

                </div>



            </div>
        </div>
    )
}

export default Home
