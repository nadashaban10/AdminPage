import { useState } from 'react';
import { FaEnvelope, FaLock } from 'react-icons/fa';
import { useNavigate } from 'react-router-dom';
import "./index.css";
import Logo from "./assets/Logo.png";

const Login = () => {
    const navigate = useNavigate();
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState(null);

    const fetchLoginUser = async (email) => {
        try {
            const response = await fetch(`https://student-app-backend-mu.vercel.app/api/v1/admins/isadmin?email=${encodeURIComponent(email)}`, {
                method: 'GET',
                headers: {
                    'Content-Type': 'application/json',
                },
            });
            const data = await response.json();

            if (response.ok) {
                if (data.isAdmin) {
                    localStorage.setItem('user', JSON.stringify(data));
                    return data;
                } else {
                    setError('غير مصرح لك بالدخول إلى هذه الصفحة.');
                    return null;
                }
            } else {
                setError(data.errors || data.message);
            }
        } catch (error) {
            setError('حدث خطأ أثناء تسجيل الدخول. حاول مرة أخرى.');
        }
    };

    const handleLoginClick = async (e) => {
        e.preventDefault();
        const user = await fetchLoginUser(email);
        if (user && user.isAdmin) {
            navigate('/dashboard');
        }
    };

    return (
        <>
            <div className="flex items-end justify-end relative rtl w-full h-[70px] bg-[rgba(68,116,124,1)]">
                <img src={Logo} alt="الشعار" className="w-[200px] h-18 object-cover bg-[rgba(68,116,124,1)] absolute top-0" />
            </div>
            <div className="h-[450px] flex items-center justify-center mt-[20px] rtl">
                <div className="p-6 max-w-lg w-full">
                    <h2 className="text-3xl font-bold text-center text-[rgba(68,116,124,1)] mb-5">تسجيل دخول</h2>
                    <p className="text-gray-400 p-2">برجاء إدخال البيانات الصحيحة</p>

                    {error && <p className="text-red-500 text-center">{error}</p>}

                    <form onSubmit={handleLoginClick}>
                        <div className="mb-6 relative">
                            <FaEnvelope className="absolute left-3 top-3 text-black" />
                            <input
                                value={email}
                                onChange={(e) => setEmail(e.target.value)}
                                type="email"
                                className="w-full px-10 py-3 border border-gray-600 bg-white text-gray-800 rounded-lg focus:outline-none focus:ring-2 focus:ring-[rgba(68,116,124,1)] transition-colors"
                                placeholder="البريد الإلكتروني"
                            />
                        </div>

                        <div className="mb-6 relative">
                            <FaLock className="absolute left-3 top-3 text-black" />
                            <input
                                value={password}
                                onChange={(e) => setPassword(e.target.value)}
                                type="password"
                                className="w-full px-10 py-3 border border-gray-600 bg-white text-gray-800 rounded-lg focus:outline-none focus:ring-2 focus:ring-[rgba(68,116,124,1)] transition-colors"
                                placeholder="كلمة المرور"
                            />
                        </div>

                        <button
                            type="submit"
                            className="w-full bg-[rgba(68,116,124,1)] text-white font-semibold py-3 rounded-lg shadow-lg hover:bg-[rgba(68,116,124,1)] transition duration-300 ease-in-out"
                        >
                            تسجيل الدخول
                        </button>
                    </form>
                </div>
            </div>
        </>
    );
};

export default Login;
