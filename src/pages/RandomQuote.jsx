import axios from "axios";
import { useState } from "react";
import { useQuery } from "react-query";
import { styled } from "styled-components";
const URL =
    "https://gist.githubusercontent.com/camperbot/5a022b72e96c4c9585c32bf6a75f62d9/raw/e3c6895ce42069f0ee7e991229064f167fe8ccdc/quotes.json";
export default function RandomQuote() {
    const randomColor = Math.floor(Math.random() * 16777215).toString(16);
    const [random, setRandom] = useState(randomColor);
    const [quote, setQuote] = useState({});
    const { data, isLoading } = useQuery({
        queryKey: ["quote"],
        queryFn: async () => {
            const res = await axios.get(URL);
            return res.data;
        },
    });

    if (isLoading) {
        return <p>Loading</p>;
    }

    const { quotes } = data;

    const handleQuote = () => {
        setRandom(randomColor);
        if (quotes) {
            const randomQuote = Math.floor(Math.random() * quotes.length);
            setQuote(quotes[randomQuote]);
        }
    };
    return (
        <QuoteContainer style={{ backgroundColor: "#" + random }}>
            <Card
                quote={quote}
                style={{ color: "#" + random }}
                handleQuote={handleQuote}
            />
            <Footer />
        </QuoteContainer>
    );
}

function Card({ handleQuote, style, quote }) {
    console.log(quote);
    return (
        <div className="card" style={style}>
            <div className="card-body">
                <p>{quote.quote}</p>
                <span>{quote.author}</span>
            </div>
            <div className="card-btn">
                <button onClick={handleQuote}>New Quote</button>
            </div>
        </div>
    );
}
function Footer() {
    return <div className="footer">Lee tam</div>;
}

const QuoteContainer = styled.div`
    width: 100%;
    height: 100vh;
    display: flex;
    justify-content: center;
    align-items: center;
    flex-direction: column;

    .card {
        width: 400px;
        height: auto;
        text-align: center;
        background-color: #fff;
        padding: 20px;
        .card-body {
            span {
                text-decoration: underline;
                width: fit-content;
                display: block;
                margin: 20px 0 20px auto;
                font-style: italic;
            }
        }
        .card-btn {
            button {
                color: inherit;
                padding: 8px 24px;
                border: transparent;
            }
        }
    }
    .footer {
        margin-top: 20px;
        color: #fff;
        text-decoration: underline;
    }
`;
