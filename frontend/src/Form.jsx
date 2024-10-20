import React, { useState } from 'react'
import { ArrowRightIcon, ExclamationCircleIcon, PlusIcon, MinusIcon } from '@heroicons/react/24/solid'
import Loading from './components/Loading'
import { useNavigate } from 'react-router-dom'
import { GaugeComponent } from 'react-gauge-component';

function Form() {

    const [stage, setStage] = useState(1)
    const [loading, setLoading] = useState(false)
    const [switchLoading, setSwitchLoading] = useState(false)

    const navigate = useNavigate();

    const [values, setValues] = useState({
        name: '',
        gender: '',
        age: '',
        height: '',
        weight: '',
        children: 0,
        smoker: '',
    });

    const [risk, setRisk] = useState(7);

    const [errors, setErrors] = useState({});

    const validateInput = (name, value) => {
        switch (name) {
            case 'name':
                if (!value) return 'Name is required.';
                if (value.length < 3) return 'Name must be at least 3 characters long.';
                if (value.length > 127) return 'Name must not exceed 127 characters.';
                return '';
            case 'age':
                if (!value) return 'Age is required.';
                if (value < 1) return 'Age must be valid.';
                if (value > 100) return 'Age must be valid.';
                return '';
            case 'height':
                if (!value) return 'Height is required.';
                return '';
            case 'weight':
                if (!value) return 'Weight is required.';
                return '';
            case 'gender':
                if (!value) return 'Gender is required.';
                return '';
            default:
                return '';
        }
    };

    const handleChange = (event) => {
        const { name, value } = event.target;
        const error = validateInput(name, value);
        setErrors({ ...errors, [name]: error });
        setValues({ ...values, [name]: value });
    };

    const isFormValid = () => {
        const newErrors = Object.keys(values).reduce((acc, key) => {
            const error = validateInput(key, values[key]);
            if (error) acc[key] = error;
            return acc;
        }, {});
        setErrors(newErrors);
        return Object.keys(newErrors).length === 0;
    };

    // Form 1

    const handleSubmitOne = async (event) => {
        event.preventDefault();
        if (isFormValid()) {
            setSwitchLoading(true);
            setTimeout(() => {
                setStage(2);
                setSwitchLoading(false);
            }, 500)
        }
    }

    // Form 2

    const handleIncrement = () => {
        setValues({ ...values, children: values.children + 1 });
    }

    const handleDecrement = () => {
        if (values.children - 1 >= 0) {
            setValues({ ...values, children: values.children - 1 });
        }
    }

    const handleSubmitTwo = async (event) => {
        event.preventDefault();
        setSwitchLoading(true);
        setTimeout(() => {
            setStage(3);
            setSwitchLoading(false);
        }, 500)
    }

    // Form 3

    const handleSmokerChange = (answer) => {
        setValues({ ...values, smoker: answer });
    };

    const handleSubmitThree = async (event) => {
        event.preventDefault();
        if (values.smoker != '') {
            setSwitchLoading(true);
            try {
                const res = await fetch(`api/risk`, {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json',
                    },
                    body: JSON.stringify(values),
                });
                const data = await res.json();
                setRisk(data.risk);
                setTimeout(setStage(4), 500);
            } catch (error) {
                console.log(error)
            } finally {
                setSwitchLoading(false);
            }
        }
    }

    if (loading) { return <Loading /> }

    return (
        <>
            <div className="flex min-h-screen flex-1">
                <div className="flex flex-1 flex-col justify-center px-4 py-12 sm:px-6 lg:flex-none lg:px-20 xl:px-24">
                    <div className="mx-auto w-full max-w-sm lg:w-96">
                        <div>
                            <a href="/">
                                <img
                                    alt="inseural"
                                    src="./logo.jpeg"
                                    className="h-auto w-[200px]"
                                />
                            </a>
                            {stage == 4 ?
                                <>
                                    <h2 className="mt-4 text-2xl font-bold leading-9 tracking-tight text-gray-800">
                                        Insurance Policy Request Submited
                                    </h2>
                                    <p className="mt-2 text-sm leading-6 text-gray-400">
                                        Your request has been submitted. Please await a response from your insurance company. Meanwhile, here is your calculated risk.
                                    </p>
                                </>
                                :
                                <p className="mt-2 text-sm leading-6 text-gray-400">
                                    To ensure the accuracy of the insurance risk prediction by the model ensure that all details are correct.
                                </p>
                            }
                        </div>
                        {stage == 1 &&
                            <>
                                <div className="mt-5">
                                    <div>
                                        <form onSubmit={handleSubmitOne} className="space-y-6">
                                            <div>
                                                <label htmlFor="name" className="block text-sm font-medium leading-6 text-gray-900">
                                                    Full Name
                                                </label>
                                                <div className="relative mt-1 rounded-md shadow-sm">
                                                    <input
                                                        type="text"
                                                        name="name"
                                                        id="name"
                                                        className={`block w-full rounded-md border-0 py-1.5 px-3 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6`}
                                                        onChange={handleChange}
                                                    />
                                                    {errors.name &&
                                                        <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center pr-3">
                                                            <ExclamationCircleIcon className="h-5 w-5 text-red-500" aria-hidden="true" />
                                                        </div>
                                                    }
                                                </div>
                                                {errors.name && <p id="name-error" className="mt-1 text-sm text-red-500">{errors.name}</p>}
                                            </div>
                                            <div>
                                                <label htmlFor="age" className="block text-sm font-medium leading-6 text-gray-900">
                                                    Age
                                                </label>
                                                <div className="relative mt-1 rounded-md shadow-sm">
                                                    <input
                                                        type="number"
                                                        name="age"
                                                        id="age"
                                                        className={`block w-full rounded-md border-0 py-1.5 px-3 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6`}
                                                        onChange={handleChange}
                                                    />
                                                    {errors.age &&
                                                        <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center pr-3">
                                                            <ExclamationCircleIcon className="h-5 w-5 text-red-500" aria-hidden="true" />
                                                        </div>
                                                    }
                                                </div>
                                                {errors.age && <p id="age-error" className="mt-1 text-sm text-red-500">{errors.age}</p>}
                                            </div>
                                            <div>
                                                <label htmlFor="height" className="block text-sm font-medium leading-6 text-gray-900">
                                                    Height (cm)
                                                </label>
                                                <div className="relative mt-1 rounded-md shadow-sm">
                                                    <input
                                                        type="number"
                                                        name="height"
                                                        id="height"
                                                        className={`block w-full rounded-md border-0 py-1.5 px-3 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6`}
                                                        onChange={handleChange}
                                                    />
                                                    {errors.height &&
                                                        <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center pr-3">
                                                            <ExclamationCircleIcon className="h-5 w-5 text-red-500" aria-hidden="true" />
                                                        </div>
                                                    }
                                                </div>
                                                {errors.height && <p id="height-error" className="mt-1 text-sm text-red-500">{errors.height}</p>}
                                            </div>
                                            <div>
                                                <label htmlFor="weight" className="block text-sm font-medium leading-6 text-gray-900">
                                                    Weight (kg)
                                                </label>
                                                <div className="relative mt-1 rounded-md shadow-sm">
                                                    <input
                                                        type="number"
                                                        name="weight"
                                                        id="weight"
                                                        className={`block w-full rounded-md border-0 py-1.5 px-3 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6`}
                                                        onChange={handleChange}
                                                    />
                                                    {errors.weight &&
                                                        <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center pr-3">
                                                            <ExclamationCircleIcon className="h-5 w-5 text-red-500" aria-hidden="true" />
                                                        </div>
                                                    }
                                                </div>
                                                {errors.weight && <p id="weight-error" className="mt-1 text-sm text-red-500">{errors.weight}</p>}
                                            </div>
                                            <div className="mt-2 -space-y-px">
                                                <label htmlFor="gender" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Gender</label>
                                                <select
                                                    id="gender"
                                                    name="gender"
                                                    value={values.gender}
                                                    onChange={handleChange}
                                                    className="bg-white border border-gray-300 text-gray-900 text-sm rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500 block w-full p-2 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                                                >
                                                    <option value="">Select Gender</option>
                                                    <option value="Male">Male</option>
                                                    <option value="Female">Female</option>
                                                </select>
                                                {errors.gender && <p id="weight-error" className="mt-1 text-sm text-red-500">{errors.gender}</p>}
                                            </div>
                                            <div>
                                                <button
                                                    type="submit"
                                                    disabled={switchLoading}
                                                    className="flex w-full justify-center rounded-md bg-indigo-600 px-3 py-2.5 text-sm font-semibold leading-6 text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
                                                >
                                                    {!switchLoading ?
                                                        <>
                                                            Next
                                                            <ArrowRightIcon className="h-5 w-5 text-white my-auto ml-2" aria-hidden="true" />
                                                        </>
                                                        :
                                                        <svg className={`animate-spin text-white h-5 w-5 my-0.5`} xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                                                            <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                                                            <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                                                        </svg>
                                                    }
                                                </button>
                                            </div>
                                        </form>
                                    </div>
                                </div>
                            </>
                        }
                        {stage == 2 &&
                            <>
                                <div className="mt-5">
                                    <div>
                                        <form onSubmit={handleSubmitTwo} className="space-y-6">
                                            <h1 className="mt-8 text-2xl leading-tight font-semibold tracking-tight text-gray-800">
                                                How many children do you have ?
                                                <div className="flex mt-4 items-center justify-evenly space-x-7">
                                                    <button
                                                        type="button"
                                                        onClick={handleDecrement}
                                                        className="rounded-full bg-gray-200 p-2 my-auto hover:bg-gray-300"
                                                    >
                                                        <MinusIcon className="h-5 w-5 text-gray-500" aria-hidden="true" />
                                                    </button>

                                                    <span className="text-[35px] font-bold text-gray-500 my-auto">{values.children}</span>

                                                    <button
                                                        type="button"
                                                        onClick={handleIncrement}
                                                        className="rounded-full bg-gray-200 p-2 hover:bg-gray-300"
                                                    >
                                                        <PlusIcon className="h-5 w-5 text-gray-800" aria-hidden="true" />
                                                    </button>
                                                </div>
                                            </h1>
                                            <div>
                                                <button
                                                    type="submit"
                                                    disabled={switchLoading}
                                                    className="flex w-full justify-center rounded-md bg-indigo-600 px-3 py-2.5 text-sm font-semibold leading-6 text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
                                                >
                                                    {!switchLoading ?
                                                        <>
                                                            Next
                                                            <ArrowRightIcon className="h-5 w-5 text-white my-auto ml-2" aria-hidden="true" />
                                                        </>
                                                        :
                                                        <svg className={`animate-spin text-white h-5 w-5 my-0.5`} xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                                                            <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                                                            <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                                                        </svg>
                                                    }
                                                </button>
                                            </div>
                                        </form>
                                    </div>
                                </div>
                            </>
                        }
                        {stage == 3 &&
                            <>
                                <div className="mt-5">
                                    <div>
                                        <form onSubmit={handleSubmitThree} className="space-y-6">
                                            <h1 className="mt-8 text-2xl leading-tight font-semibold tracking-tight text-gray-800">
                                                Do you smoke frequently ?
                                                <div className="flex space-x-4 justify-evenly mt-4 text-lg font-bold">
                                                    <button
                                                        type="button"
                                                        onClick={() => handleSmokerChange('yes')}
                                                        className={`rounded-full bg-gray-100 p-2 px-5 text-gray-500 hover:bg-gray-200 ${values.smoker === 'yes' ? 'ring-2 ring-indigo-400 text-indigo-600' : ''}`}
                                                    >
                                                        Yes
                                                    </button>
                                                    <button
                                                        type="button"
                                                        onClick={() => handleSmokerChange('no')}
                                                        className={`rounded-full bg-gray-100 p-2 px-5 text-gray-500 hover:bg-gray-200 ${values.smoker === 'no' ? 'ring-2 ring-indigo-400 text-indigo-600' : ''}`}
                                                    >
                                                        No
                                                    </button>
                                                </div>
                                            </h1>

                                            <div>
                                                <button
                                                    type="submit"
                                                    disabled={switchLoading}
                                                    className="flex w-full justify-center rounded-md bg-indigo-600 px-3 py-2.5 text-sm font-semibold leading-6 text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
                                                >
                                                    {!switchLoading ?
                                                        <>
                                                            Next
                                                            <ArrowRightIcon className="h-5 w-5 text-white my-auto ml-2" aria-hidden="true" />
                                                        </>
                                                        :
                                                        <svg className={`animate-spin text-white h-5 w-5 my-0.5`} xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                                                            <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                                                            <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                                                        </svg>
                                                    }
                                                </button>
                                            </div>
                                        </form>
                                    </div>
                                </div>
                            </>
                        }
                        {stage == 4 &&
                            <>
                                <GaugeComponent
                                    type="semicircle"
                                    arc={{
                                        colorArray: ['#00FF15', '#FF2121'],
                                        padding: 0.02,
                                        subArcs:
                                            [
                                                { limit: 40 },
                                                { limit: 60 },
                                                { limit: 70 },
                                            ]
                                    }}
                                    labels={{
                                        valueLabel: {
                                            style: {
                                                fill: "#000000"
                                            }
                                        }
                                    }}
                                    pointer={{ type: "blob", animationDelay: 0 }}
                                    value={(risk/10*100)}
                                />
                            </>
                        }
                    </div>
                </div>
                <div className="relative hidden w-0 flex-1 lg:block">
                    <img
                        alt=""
                        src="https://images.unsplash.com/photo-1496917756835-20cb06e75b4e?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=1908&q=80"
                        className="absolute inset-0 h-full w-full object-cover"
                    />
                </div>
            </div>
        </>
    )
}

export default Form