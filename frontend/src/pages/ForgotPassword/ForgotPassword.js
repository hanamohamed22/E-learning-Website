import { useState } from "react";
import axios from "axios";
import styles from "./styles.module.css";
import Form from 'react-bootstrap/Form';
import Button from 'react-bootstrap/Button';

const ForgotPassword = () => {
	const [email, setEmail] = useState("");
	const [msg, setMsg] = useState("");
	const [error, setError] = useState("");

	const handleSubmit = async (e) => {
		if(email===""){
			alert("You have to enter your email")
		}else if(!/^[a-zA-Z0-9]+@[a-zA-Z0-9]+\.[A-Za-z]+$/.test(email)){
			alert("You have to enter a valid email address")
		}else{
		e.preventDefault();
		try {
			
			const { data } = await axios.post("/forgotpassword", { email });
			setMsg(data.message);
			setError("");
			setEmail("");
		} catch (error) {
			if (
				error.response &&
				error.response.status >= 400 &&
				error.response.status <= 500
			) {
				setError(error.response.data.message);
				setMsg("");
			}
		}
		}
	};

	return (
		<div className={styles.container}>
			<Form className={styles.form_container} onSubmit={handleSubmit}>
				<h1>Forgot Password</h1>
                <h4>Enter your email address to be sent a Passsword reset link</h4>
				<input
					type="email"
					placeholder="Email"
					name="email"
					onChange={(e) => setEmail(e.target.value)}
					value={email}
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
	);
};

export default ForgotPassword;