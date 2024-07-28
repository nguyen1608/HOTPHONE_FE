import { Box, Container, Typography } from "@mui/material";
import SafetyDividerIcon from '@mui/icons-material/SafetyDivider';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faPieChart } from "@fortawesome/free-solid-svg-icons";
import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { useNavigate } from "react-router-dom";
function SubHeader (){
    const [user, setUser] = useState<{ username: string } | null>(null);
    const [username, setUsername] = useState('');
    const navigate = useNavigate();
    useEffect(() => {
        // Lấy chuỗi JSON từ localStorage
        const storedData = localStorage.getItem('user');
        
        if (storedData) {
            // Chuyển đổi chuỗi JSON thành đối tượng JavaScript
            const userData = JSON.parse(storedData);

            // Lấy username từ đối tượng
            if (userData && userData.username) {
                setUsername(userData.username);
            }
        }
    }, []);
    const logout = () => {
        localStorage.removeItem('token');
        localStorage.removeItem('user');
        setUser(null);
        navigate('/login'); // Điều hướng đến trang đăng nhập sau khi logout
        window.location.reload();
      };

    



return(
<>
<Box sx={{display:'flex', justifyContent:'space-around', height:'30px' , backgroundColor:'#eeeeee', maxWidth: '100%'}} >
<Box component={'div'} className="phone"  sx={{ display: 'flex', alignItems: 'center', gap: '5px' }}>
<Typography>HOTLINE: 19001508</Typography>
<img src="https://upload.wikimedia.org/wikipedia/commons/thumb/8/81/Breezeicons-actions-22-filename-divider.svg/2048px-Breezeicons-actions-22-filename-divider.svg.png" width={'25px'}></img>
<Typography>EMAIL: HOTPHONE@GMAIL.COM</Typography>
</Box>

<Box component={'div'} className="login"  sx={{ display: 'flex', alignItems: 'center', gap: '5px' }}>
{username ? (
     <Typography>{username}</Typography>
    ) : ( 
 <Link to={'login'}>     
<Typography>ĐĂNG NHẬP</Typography>
</Link>  
 )}
 <img src="https://upload.wikimedia.org/wikipedia/commons/thumb/8/81/Breezeicons-actions-22-filename-divider.svg/2048px-Breezeicons-actions-22-filename-divider.svg.png" width={'25px'}></img>
 {username ? (
<Typography onClick={logout}>ĐĂNG XUẤT</Typography>
 ):(
<Link to={'register'}>     
<Typography >ĐĂNG KÝ</Typography>
</Link>  
 )}
<img src="https://upload.wikimedia.org/wikipedia/commons/thumb/8/81/Breezeicons-actions-22-filename-divider.svg/2048px-Breezeicons-actions-22-filename-divider.svg.png" width={'25px'}></img>
<Typography>VI</Typography>
<img src="https://upload.wikimedia.org/wikipedia/commons/thumb/8/81/Breezeicons-actions-22-filename-divider.svg/2048px-Breezeicons-actions-22-filename-divider.svg.png" width={'25px'}></img>
<Typography>EN</Typography>
</Box>
</Box>


</>

)


}

export default SubHeader;