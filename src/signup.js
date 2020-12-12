import React, {useState, useEffect} from "react";
import {useHistory} from "react-router";
import axios from "axios";
import {Row, Col, Card, Form, Input, Select, Radio, Checkbox, Button, InputNumber} from "antd";
import {UserOutlined, MailOutlined, HomeOutlined, FlagOutlined, LockOutlined, MobileOutlined} from "@ant-design/icons";
import 'antd/dist/antd.css';


const SignUp = (props) => {
    const history = useHistory();
    const [userDetail, setUserDetail] = useState({});
    const [data, setData] = useState([]);
    const [error, setError] = React.useState({});

    const [items] = useState([
        {
            label: "India",
            value: "India"
        },
        {
            label: "Brazil",
            value: "Brazil"
        },
        {
            label: "USA",
            value: "USA"
        },
        {
            label: "Dubai",
            value: "Dubai"
        },
        {
            label: "UK",
            value: "UK"
        }
    ]);

    useEffect(() => {
        listData(props.match.params.id);
    }, [props.match.params.id])

    const listData = (id) => {
        if (props.match.params.id !== undefined) {
            axios.get(`http://localhost:8080/users/${id}`)
                .then(response =>{
                    if(response.data && response.data._id){
                        setUserDetail(response.data)}
                })
                .catch(error =>
                    console.log(error)
                );
        }

    }

    const handleChange = (e) => {
        const {name, value} = e.target;

        setUserDetail({...userDetail, [name]: value})
    }
    const validate = (name, value) => {
        const emailRegx = /^[\w-]+@([\w-]+\.)+[\w-]{2,4}$/ig;
        const numRegx = /^\d{1,6}(?:\.\d{0,2})?$/g;
        const phoneRegx = /^[0]?[789]\d{9}$/
        switch (name) {
            case 'firstName':
                if (!value) return "First Name is required";
                return null;
            case 'lastName':
                if (!value) return "Last Name is required";
                return null;
            case 'email':
                if (!emailRegx.test(value)) return "Email is required";
                return null;
            case 'phone':
                if (!phoneRegx.test(value)) return "Valid PhoneNumber  is required";
                return null;
            case 'age':
                if (!numRegx.test(value)) return "Age is required";
                return null;
            case 'address':
                if (value.length < 5) return "Address is required";
                return null;
            case 'gender':
                if (!value) return "Gender is required";
                return null;
            case 'country':
                if (!value) return "Country is required";
                return null;
            case 'password':
                if (value.length < 3) return "Password is required";
                return null;
            case 'checkbox':
                if (!value) return "mark is required";
                return null;
            default:
                return null;
        }
    };

    const resetForm = () => {
        setUserDetail({})
        setError({})
    }

    const onSubmit = () => {
        let errorObj = {}
        const newsUerDetail = {
            firstName: userDetail.firstName,
            lastName: userDetail.lastName,
            email: userDetail.email,
            age: userDetail.age,
            phone: userDetail.phone,
            address: userDetail.address,
            gender: userDetail.gender,
            country: userDetail.country,
            password: userDetail.password
        }

        Object.keys(newsUerDetail).forEach((key) => {
            const error = validate(key, newsUerDetail[key]);
            if (error && error.length) {
                errorObj[key] = error;
            }
        });
        if (Object.keys(errorObj).length) {
            return setError(errorObj);
        }
        else {
            if (props.match.params.id !== undefined) {
                axios.put (`http://localhost:8080/users/${userDetail._id}`,userDetail)
                    .then((res) => {
                            resetForm()
                            history.push("/user")
                        }
                    );
            } else {
                userDetail.id = data.length + 1;
                axios.post('http://localhost:8080/users', userDetail)
                    .then(() => {
                        resetForm()
                        history.push("/login")
                    })
            }
        }

    }



    return (
        <>
            <Row style={{marginTop: 100}}>
                <Col span={8}/>
                <Col span={8}>
                    <Card>
                        <h2 style={{textAlign: "center"}}>Registration Form</h2>
                        <p style={{textAlign: "center"}}>Creat Your Account</p><br/>
                        <Form>
                            <Form.Item>
                                <Input placeholder="Enter Your firstname" name="firstName" value={userDetail.firstName}
                                       onChange={handleChange} addonBefore={(<UserOutlined/>)}/>
                                <span className="text-danger">{error.firstName || ""}</span>
                            </Form.Item>

                            <Form.Item>
                                <Input placeholder="Enter Your lastname" name="lastName" value={userDetail.lastName}
                                       onChange={handleChange} addonBefore={(<UserOutlined/>)}/>
                                <span className="text-danger">{error.lastName || ""}</span>
                            </Form.Item>

                            <Form.Item>
                                <Input placeholder="Enter Your EmailId" name="email" value={userDetail.email}
                                       onChange={handleChange} addonBefore={<MailOutlined/>}/>
                                <span className="text-danger">{error.email || ""}</span>
                            </Form.Item>

                            <Form.Item>
                                <Input placeholder="Enter Your Mobile Number" name="phone" value={userDetail.phone}
                                       onChange={handleChange} addonBefore={<MobileOutlined/>}
                                       style={{width: '100%'}}/>
                                <span className="text-danger">{error.phone || ""}</span>
                            </Form.Item>

                            <Form.Item>
                                Age : <InputNumber placeholder="age" name="age"
                                                   onChange={value => handleChange({target: {name: "age", value}})}
                                                   value={userDetail.age}/>
                                <span className="text-danger">{error.age || ""}</span>
                            </Form.Item>


                            <Form.Item>
                                <Input rows={4} name="address" placeholder="Please Input Your Address!"
                                       value={userDetail.address}
                                       onChange={handleChange} addonBefore={<HomeOutlined/>}/>
                                <span className="text-danger">{error.address || ""}</span>

                            </Form.Item>

                            <Form.Item>

                                Gender: <Radio.Group name="gender" onChange={e => handleChange({
                                target: {
                                    name: "gender",
                                    value: e.target.value
                                }
                            })} value={userDetail.gender}>
                                <Radio value="Male">Male</Radio>
                                <Radio value="Female">Female</Radio>
                                <Radio value="Other">Other</Radio>
                            </Radio.Group>
                                <span className="text-danger">{error.gender || ""}</span>
                            </Form.Item>

                            <Form.Item label={(<FlagOutlined/>)}>
                                <Select
                                    placeholder="Please Select Your Country"
                                    onChange={value => handleChange({target: {name: "country", value}})}
                                    value={userDetail.country}
                                    allowClear
                                >
                                    {items.map(items => (
                                        <Select.Option
                                            key={items.value}
                                            value={items.value}>
                                            {items.label}
                                        </Select.Option>
                                    ))}
                                </Select>
                                <span className="text-danger">{error.country || ""}</span>
                            </Form.Item>

                            <Form.Item>

                                <Input.Password placeholder="Enter Your PassWord" name="password"
                                                value={userDetail.password} onChange={handleChange}
                                                addonBefore={(<LockOutlined/>)}/>
                                <span className="text-danger">{error.password || ""}</span>
                            </Form.Item>

                            <Form.Item>
                                <Checkbox name="checkbox">
                                    I have read the agreement
                                </Checkbox>
                            </Form.Item>

                            <Form.Item>
                                <Button className="btn-create-account" onClick={onSubmit}>
                                    Create Account
                                </Button>
                            </Form.Item>
                        </Form>
                    </Card>
                </Col>
                <Col span={8}/>
            </Row>
        </>
    )
}
export default SignUp;
