import { useEffect, useState, Fragment } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";
import styles from "./styles.module.css";
import Form from 'react-bootstrap/Form';
import Button from 'react-bootstrap/Button';

const ResetPassword = () => {
	const [validUrl, setValidUrl] = useState(false);
	const [password, setPassword] = useState("");
    const [confirmPassword, setConfirmPassword] = useState("");
	const [msg, setMsg] = useState("");
	const [error, setError] = useState("");
	const param = useParams();
	

	useEffect(() => {
		const verifyUrl = async () => {
			try {
				await axios.get(`/resetpassword/${param.id}/${param.token}`);
				setValidUrl(true);
			} catch (error) {
				setValidUrl(false);
			}
		};
		verifyUrl();
	}, [param]);

	const handleSubmit = async (e) => {
       
		e.preventDefault();
        if(password===confirmPassword){
		try {
            //console.log(param.id);
			const { data } = await axios.post(`http://localhost:4000/resetpassword/?id=${param.id}&token=${param.token}`, { password });
			setMsg(data.message);
			setError("");
            setPassword("");
            setConfirmPassword("");
			//window.location = "/login";
		} catch (error) {
			if (
				error.response &&
				error.response.status >= 400 &&
				error.response.status <= 500
			) {
				setError(error.response.data.message);
				setMsg("");
			}
		}}
        else{

            setError("Passwords don't match");
            setPassword("");
            setConfirmPassword("");
        }
	};

	return (
		<Fragment>
			{validUrl ? (
				<div className={styles.container}>
					<Form className={styles.form_container} onSubmit={handleSubmit}>
						<h4>Reset Your Password</h4>
						<input
							type="password"
							placeholder="Password"
							name="password"
							onChange={(e) => setPassword(e.target.value)}
							value={password}
							required
							className={styles.input}
						/>
                        <input
							type="password"
							placeholder="Confirm Password"
							name="confirmPassword"
							onChange={(e) => setConfirmPassword(e.target.value)}
							value={confirmPassword}
							required
							className={styles.input}
						/>
						{error && <div className={styles.error_msg}>{error}</div>}
						{msg && <div className={styles.success_msg}>{msg}</div>}
						<Button type="submit" className={styles.green_btn}>
							Submit
						</Button>
					</Form>
				</div>
			) : (
				<h1>404 Not Found</h1>
			)}
		</Fragment>
	);
};

export default ResetPassword;