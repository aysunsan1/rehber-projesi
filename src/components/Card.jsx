import { RiDeleteBinLine } from "react-icons/ri";
import { RiEdit2Fill } from "react-icons/ri";
import { FaPhone } from "react-icons/fa";
import { MdEmail } from "react-icons/md";
const Card = ({ contact, handleDelete, handleEdit }) => {
  // Kişi isimlerinin ad ve soyadının ilk harflerini bölmek için bu veriyi split ile böldük.Sonrasında bunları isim soyisim değerlerine aktardık
  const [name, surname] = contact.name.split(" ");

  return (
    <div className="card">
      {/* Buttons */}
      <div className="buttons">
        <button onClick={() => handleEdit(contact)}>
          <RiEdit2Fill />
        </button>
        <button onClick={() => handleDelete(contact.id)}>
          <RiDeleteBinLine />
        </button>
      </div>
      {/* Person Profile */}
      <h1>
        {name[0]} {surname[0]}
      </h1>
      {/* Name  */}
      <h3>{contact.name}</h3>
      {/* Position */}
      <p>{contact.positon}</p>
      {/* Company */}
      <p>{contact.company}</p>

      {/* Bottom */}
      <div className="bottom">
        <div>
          <span>
            <FaPhone />
          </span>
          <span>{contact.phone}</span>
        </div>
        <div>
          <span>
            <MdEmail />
          </span>
          <span>{contact.email}</span>
        </div>
      </div>
    </div>
  );
};

export default Card;
