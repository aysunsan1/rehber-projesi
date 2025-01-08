import { useEffect, useState } from "react";
import axios from "axios";
// Icons Imports
import { RiSearchLine } from "react-icons/ri";
import { IoMenu } from "react-icons/io5";
import { HiMiniSquares2X2 } from "react-icons/hi2";
import { IoPersonAdd } from "react-icons/io5";
// Components Import
import Card from "./components/Card";
import Modal from "./components/Modal";

// axios la baseUrl tanımlama

axios.defaults.baseURL = "http://localhost:3000";
function App() {
  // Bileşen içerisinde verileri yönetmek için state tanımla
  const [contacts, setContacts] = useState([]);
  const [isModelOpen, setIsModelOpen] = useState(false);
  const [editItem, setEditItem] = useState(null);

  //  Sayfa yüklendiğinde api'dan verileri al
  useEffect(() => {
    axios.get("/contact").then((res) => setContacts(res.data));
  }, []);

  // Form gönderildiğinde çalışacak fonksiyon
  const handleSubmit = (e) => {
    // Sayfa yenilemesini engelle
    e.preventDefault();
    // Input içerisindeki değere eriş
    const text = e.target[1].value;

    // api'a gönderilecek parametreleri belirle
    const params = {
      q: text,
    };

    // İnputtan alına değer neticesinde ilgili veriyi api'dan al
    axios.get("/contact", { params }).then((res) => setContacts(res.data));
  };

  //  Sil butonuna tıklanınca ilgili kişiyi silen fonksiyon

  const handleDelete = (id) => {
    const res = confirm("Kişiyi silmek istediğinizden eminmisiniz ?");

    if (res) {
      // Api dan id'si bilinen kullanıcıyı silsin
      axios
        .delete(`/contact/${id}`)
        .then(() => {
          // Silinen kişiyi state'den kaldır
          const updated = contacts.filter((contact) => contact.id !== id);
          setContacts(updated);
        })
        .catch((err) => {
          alert("Silme işlemi sırasında bir hata oluştu !!");
          alert(err);
        });
    }
  };

  //  Güncelle ikonuna tıklayınca ilgili kişi verisinini güncelleyecek fonksiyon

  const handleEdit = (contact) => {
    //  Modal'ı Aç
    setIsModelOpen(true);

    // Güncellenecek kişiyi state e aktar
    setEditItem(contact);
  };

  return (
    <div className="app">
      {/* Header */}
      <header>
        <h1>Rehber</h1>

        <div>
          <form onSubmit={handleSubmit}>
            <button>
              <RiSearchLine />
            </button>
            <input type="text" placeholder="kişi aratınız ..." />
          </form>

          <button className="ns">
            <IoMenu />
          </button>
          <button className="ns">
            <HiMiniSquares2X2 />
          </button>

          <button onClick={() => setIsModelOpen(true)} className="add">
            <IoPersonAdd />
            <span>Yeni Kişi</span>
          </button>
        </div>
      </header>
      {/* Main */}
      <main>
        {contacts.map((contact) => (
          <Card
            key={contact.id}
            contact={contact}
            handleDelete={handleDelete}
            handleEdit={handleEdit}
          />
        ))}
      </main>
      {/* Modal */}
      <Modal
        isModelOpen={isModelOpen}
        setIsModelOpen={setIsModelOpen}
        setContacts={setContacts}
        editItem={editItem}
        setEditItem={setEditItem}
      />
    </div>
  );
}

export default App;
