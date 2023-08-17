import { ToastContainer, toast } from "react-toastify";
import { styled } from "styled-components";
import "react-toastify/dist/ReactToastify.css";
import { useEffect, useState } from "react";

function generator({
    passwordLength = 1,
    upperCase = false,
    lowerCase = false,
    number = false,
    symbols = false,
}) {
    const numbers = "0123456789";
    const upperCaseLetters = "ABCDEFGHIJKLMNOPQRSTUVWXYZ";
    const lowerCaseLettters = "abcdefghijklmnopqrstuvwxyz";
    const specialCharacters = "!'^+%&/()=?_#$½§{[]}|;:>÷`<.*-@é";
    const arr = [];
    if (number) arr.push(numbers);
    if (upperCase) arr.push(upperCaseLetters);
    if (lowerCase) arr.push(lowerCaseLettters);
    if (symbols) arr.push(specialCharacters);

    let result = "";
    for (let index = 0; index < passwordLength; index++) {
        const randomArr = Math.floor(Math.random() * arr.length);
        result += arr[randomArr].charAt(
            Math.floor(Math.random() * arr[randomArr].length)
        );
    }
    return result;
}

export default function GeneratorPassword() {
    return (
        <>
            <CardContainer>
                <Form />
            </CardContainer>
            <ToastContainer />
        </>
    );
}

function Form() {
    const [copied, setCopied] = useState(false);
    const [input, setInput] = useState("");
    const [state, setState] = useState(() => {
        return {
            passwordLength: 1,
            upperCase: false,
            lowerCase: false,
            number: false,
            symbols: false,
        };
    });

    const handleChange = (e) => {
        if (e.target.name === "passwordLength") {
            setState((current) => {
                return {
                    ...current,
                    [e.target.name]: e.target.value,
                };
            });
        } else {
            setState((current) => {
                return {
                    ...current,
                    [e.target.name]: e.target.checked,
                };
            });
        }
    };
    const handleGenerator = () => {
        if (
            state.passwordLength > 0 &&
            (state.lowerCase ||
                state.number ||
                state.symbols ||
                state.upperCase)
        ) {
            setInput(generator(state));
            setCopied(false);
        } else {
            toast.error("chose one checked field and Password length > 0");
        }
    };
    const handleCopied = async () => {
        const cp = await navigator.clipboard.readText();
        var copyText = document.getElementById("result");
        if (!copyText.value) return;
        if (copyText.value === cp) return;

        setCopied((curr) => !curr);
        // Copy the text inside the text field

        // Select the text field
        copyText.select();

        // Copy the text inside the text field
        navigator.clipboard.writeText(copyText.value);

        // Alert the copied text
        toast.success(`copied! password: ${copyText.value}`);
    };
    useEffect(() => {
        const copiedElement = document.querySelector("#copied");
        copiedElement.addEventListener("click", handleCopied);
        return () => {
            copiedElement.removeEventListener("click", handleCopied);
        };
    }, []);
    return (
        <form onSubmit={(e) => e.preventDefault()}>
            <h3>Password Generator</h3>
            <div className="form-input">
                <input
                    id="result"
                    type="text"
                    value={input}
                    onChange={(e) => setInput(e.target.value)}
                />
                <span id="copied">{copied ? "copied" : "copy"}</span>
            </div>
            <div className="form-group">
                <label htmlFor="pwlg" className="form-label">
                    Password length
                </label>
                <input
                    onChange={handleChange}
                    value={state.passwordLength}
                    id="pwlg"
                    name="passwordLength"
                    type="number"
                    className="form-control"
                />
            </div>
            <div className="form-group">
                <label htmlFor="uppercase-letter" className="form-label">
                    Include Uppercase Letters
                </label>
                <input
                    checked={state.upperCase}
                    onChange={handleChange}
                    name="upperCase"
                    id="uppercase-letter"
                    type="checkbox"
                    className="form-control"
                />
            </div>
            <div className="form-group">
                <label htmlFor="lowercase-letter" className="form-label">
                    Include Lowercase Letters
                </label>
                <input
                    checked={state.lowerCase}
                    onChange={handleChange}
                    name="lowerCase"
                    id="lowercase-letter"
                    type="checkbox"
                    className="form-control"
                />
            </div>
            <div className="form-group">
                <label htmlFor="include-number" className="form-label">
                    Include Numbers
                </label>
                <input
                    checked={state.number}
                    onChange={handleChange}
                    name="number"
                    id="include-number"
                    type="checkbox"
                    className="form-control"
                />
            </div>
            <div className="form-group">
                <label htmlFor="include-symbols" className="form-label">
                    Include symbols
                </label>
                <input
                    checked={state.symbols}
                    onChange={handleChange}
                    name="symbols"
                    id="include-symbols"
                    type="checkbox"
                    className="form-control"
                />
            </div>
            <div className="form-btn">
                <button onClick={handleGenerator} type="submit">
                    Generate New Password
                </button>
            </div>
        </form>
    );
}

const CardContainer = styled.div`
    width: 100%;
    height: 100vh;
    display: flex;
    justify-content: center;
    align-items: center;
    flex-direction: column;
    background: #7a92f1;
    form {
        padding: 20px 40px;
        background-color: #fff;
        .form-input {
            margin-bottom: 20px;
            position: relative;
            input {
                display: block;
                padding: 6px 0 6px 10px;
                font-size: 18px;
                border-radius: 0;
                outline: transparent;
            }
            span {
                position: absolute;
                right: -5px;
                top: 50%;
                transform: translateY(-50%);
                background-color: #7a92f1;
                padding: 10px;
                color: #fff;
                cursor: pointer;
                &:hover {
                    background-color: #4d70fc;
                }
            }
        }
        .form-group {
            display: flex;
            justify-content: space-between;
            margin-bottom: 10px;
            .form-control {
                width: 20%;
            }
        }
        .form-btn {
            button {
                width: 100%;
                padding: 8px 0;
                border: transparent;
                cursor: pointer;
                transition: background-color 0.3s ease;
                &:hover {
                    background-color: #ccc;
                }
            }
        }
    }
`;
