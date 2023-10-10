import React, { useState } from 'react';
import Modal from 'react-modal';
import { useNavigate } from 'react-router-dom';
import { addSport } from '../../../services/adminAxios';



const AddSportModal = ({ isOpen, onClose }) => {
  const [sportsName, setSportsName] = useState('');
  const [sportsFacility, setSportsFacility] = useState('');
  const [sportsNameError, setSportsNameError] = useState('');
  const [sportsFacilityError, setSportsFacilityError] = useState('');

  const navigate = useNavigate();

  const handleSportsNameChange = (event) => {
    setSportsName(event.target.value);
  };

  const handleSportsFacilityChange = (event) => {
    setSportsFacility(event.target.value);
  };

  const handleSubmitAddSport = async (e) => {
    e.preventDefault();
  
    if (validateForm()) {
      try {
        const data = await addSport(sportsFacility,sportsName);
       
        if (data && data.message) {
          if (data.message === 'Sport added successfully' || data.message === 'Sport and facility added successfully') {
            navigate('/admin/features');
            onClose();
          } else if (data.message === 'Sport and facility already exist') {
            
            setSportsNameError('Sport and facility already exist');
          } else {
            
            setSportsNameError('Failed to add. Already Exist!!');
          }
        }
      } catch (error) {
        
        setSportsNameError('Failed to add. Already Exist!!');
      }
    }
  };
  

  const validateForm = () => {
    let isValid = true;

    if (sportsName === '') {
      setSportsNameError('Sports Name is required.');
      isValid = false;
    }  else if (!/^(Cricket|Football|Volleyball|Badminton|Tennis)\b/.test(sportsName)) {
      setSportsNameError('Invalid sport name. It should be Cricket | Football | Volleyball | Badminton | Tennis.');
      isValid = false;
    } else if (!/^[A-Z]/.test(sportsName)) {
      setSportsNameError('Sports Name should start with a capital letter.');
      isValid = false;
    } else {
      setSportsNameError('');
    }

    if (sportsFacility === '') {
      setSportsFacilityError('Sports Facility is required.');
      isValid = false;
    } else if (!/^\d+\x\d+$/.test(sportsFacility)) {
      setSportsFacilityError('Sports Facility should be in the format of "number" x "number".');
      isValid = false;
    } else {
      setSportsFacilityError('');
    }

    return isValid;
  };

  Modal.setAppElement('#root');

  return (
    <Modal isOpen={isOpen} onRequestClose={onClose} className="Modal" overlayClassName="Overlay">
      <div className="fixed m-24 inset-0 flex items-start justify-center">
        <div className="bg-black bg-opacity-75 rounded-lg p-6">
          <h2 className="text-lg text-white font-semibold">ADD SPORT</h2>
          <p className="mt-4 text-white">Please Provide The Details</p>
          <div className="flex justify-center mt-4">
            {/* Form with input fields */}
            <form onSubmit={handleSubmitAddSport} className="space-y-4">
            <div>
                <label htmlFor="sportsName" className="text-white">
                  Sports Name:
                </label>
                <select
                  id="sportsName"
                  className="px-4 py-2 border rounded-lg w-full"
                  value={sportsName}
                  onChange={handleSportsNameChange}
                >
                  <option value="">Select a sport</option>
                  <option value="Cricket">Cricket</option>
                  <option value="Football">Football</option>
                  <option value="Volleyball">Volleyball</option>
                  <option value="Badminton">Badminton</option>
                  <option value="Tennis">Tennis</option>
                </select>
                {sportsNameError && <p className="text-red-500 mt-1">{sportsNameError}</p>}
              </div>
              <div>
                <label htmlFor="sportsFacility" className="text-white">
                  Sports Facility:
                </label>
                <input
                  type="text"
                  id="sportsFacility"
                  className="px-4 py-2 border rounded-lg w-full"
                  value={sportsFacility}
                  onChange={handleSportsFacilityChange}
                />
                {sportsFacilityError && <p className="text-red-500 mt-1">{sportsFacilityError}</p>}
              </div>
              <div className="flex justify-center">
                <button type="submit" className="px-4 py-2 bg-green-500 text-white rounded-lg mr-2 hover:bg-green-950"
                >
                  ADD
                </button>
                <button
                  className="px-4 py-2 bg-gray-500 text-white rounded-lg hover:bg-black"
                  onClick={onClose}
                >
                  Cancel
                </button>
              </div>
            </form>
            {/* End of form */}
          </div>
        </div>
      </div>
    </Modal>
  );
};

export default AddSportModal;
