'use client';

import { useEffect, useState } from 'react';
import styles from '@/styles/ContactModal.module.scss';

const ContactModal = ({ isOpen, onClose }) => {
  const [formData, setFormData] = useState({
    name: '',
    phone: '',
    email: '',
    consent: false
  });
  
    const [errors, setErrors] = useState({});
    const [show, setShow] = useState(false);

    useEffect(() => {
    if (isOpen) {
        setShow(true);
    } else {
        setShow(false);
    }
    }, [isOpen]);

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    
    if (name === 'phone') {
      setFormData(prev => ({
        ...prev,
        [name]: formatPhone(value)
      }));
    } else {
      setFormData(prev => ({
        ...prev,
        [name]: type === 'checkbox' ? checked : value
      }));
    }
    
    if (errors[name]) {
      setErrors(prev => ({ ...prev, [name]: '' }));
    }
  };

  const validateForm = () => {
    const newErrors = {};
    
    if (!formData.name.trim()) {
      newErrors.name = 'Введите имя';
    }
    
    if (!formData.phone.trim()) {
      newErrors.phone = 'Введите телефон';
    } 
    if (!formData.email.trim()) {
      newErrors.email = 'Введите email';
    }
    
    if (!formData.consent) {
      newErrors.consent = 'Необходимо согласие на обработку данных';
    }
    
    return newErrors;
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    
    const newErrors = validateForm();
    
    if (Object.keys(newErrors).length === 0) {
      alert('Форма отправлена!');
      onClose();
      setFormData({
        name: '',
        phone: '',
        email: '',
        consent: false
      });
    } else {
      setErrors(newErrors);
    }
  };

  const handleOverlayClick = (e) => {
    if (e.target === e.currentTarget) {
      onClose();
    }
  };

  if (!isOpen) return null;

  return (
    <div className={`${styles.overlay} ${isOpen ? styles.open : styles.close}`} onClick={handleOverlayClick}>
      <div className={`${styles.modal} ${isOpen ? styles.open : styles.close}`}>
        <div className={styles.header}>
            <h2 className={styles.title}>СВЯЗАТЬСЯ С НАМИ</h2>
            <button className={styles.closeButton} onClick={onClose}>
            ✕
            </button>
        </div>
        
        <form onSubmit={handleSubmit} className={styles.form}>
            <div className={styles.formGroup}>
            <input
                type="text"
                id="name"
                name="name"
                value={formData.name}
                onChange={handleChange}
                placeholder="Имя"
                className={`${styles.input} ${errors.name ? styles.error : ''}`}
            />
            </div>

            <div className={styles.formGroup}>
            <input
                type="tel"
                id="phone"
                name="phone"
                value={formData.phone}
                onChange={handleChange}
                placeholder="Телефон"
                className={`${styles.input} ${errors.phone ? styles.error : ''}`}
            />
            </div>

            <div className={styles.formGroup}>
                <input
                type="email"
                id="email"
                name="email"
                value={formData.email}
                onChange={handleChange}
                placeholder="E-mail"
                className={`${styles.input} ${errors.email ? styles.error : ''}`}
                />
            </div>

            <div className={styles.checkboxGroup}>
                <label className={styles.checkboxLabel}>
                <input
                    type="checkbox"
                    name="consent"
                    checked={formData.consent}
                    onChange={handleChange}
                    className={styles.checkbox}
                    id="consent-checkbox"
                />
                <span className={styles.checkboxContainer}>
                    <span className={styles.checkboxInner}></span>
                </span>
                <span className={styles.checkboxText}>
                    Я СОГЛАСЕН НА ОБРАБОТКУ ПЕРСОНАЛЬНЫХ ДАННЫХ
                </span>
                </label>
            </div>

          <button type="submit" className={styles.submitButton}>
            <span>Отправить</span> 
          </button>
        </form>
      </div>
    </div>
  );
};

export default ContactModal;