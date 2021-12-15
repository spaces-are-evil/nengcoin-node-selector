import Head from 'next/head'
import Image from 'next/image'

import { getConnectedNodes } from '../lib/miningnodes'
import { getNodeCountries } from '../lib/miningnodes'
import { getCurrentBlock } from '../lib/miningnodes'

import { ClipboardCopy } from '../lib/clipboardcopy'

import React, { useState } from 'react'

export default function Home({ nodes, connectedNodes, nodeCountries, currentBlock }) {
    const [nodeList, setNodeList] = useState(connectedNodes);
    const [filteredNodeList, setFilteredNodeList] = useState(nodeList);

    const [nodeCountryList, setSelectedNodeCountryList] = useState(nodeCountries);
    const [filteredNodeCountryList, setFilteredNodeCountryList] = useState("");

    const donateAddress = "CHnMzKaAB1TDoHKi7MePNHf6ymhP9eSNiB";

    //button click event
    const handleFlagClick = (event, country) => {
        var currentFilteredNodeCountryList = filteredNodeCountryList;

        //do if selected country isnt in filter
        if (!currentFilteredNodeCountryList.includes(country)) {
            //initialize array if empty
            if (currentFilteredNodeCountryList === 'undefined' || currentFilteredNodeCountryList.length === 0) {
                currentFilteredNodeCountryList = [country];
            }
            else {
                //add country to filter
                currentFilteredNodeCountryList.push(country);
            }
        }
        //do if selected country is in filter
        else {
            //remove country from array
            const newFilteredNodeCountryList = currentFilteredNodeCountryList.filter(
                (nodeCountry) => {
                    if (nodeCountry != country) {
                        return nodeCountry;
                    }
                });
            currentFilteredNodeCountryList = newFilteredNodeCountryList;
        }

        //update state
        setFilteredNodeCountryList(currentFilteredNodeCountryList);
        var newFilteredNodeList;

        //do if filter is empty
        if ((typeof (currentFilteredNodeCountryList) !== 'undefined' && currentFilteredNodeCountryList.length === 0)
            || currentFilteredNodeCountryList === undefined || currentFilteredNodeCountryList.length == 0) {
            //reset filtered node list
            newFilteredNodeList = nodeList;
        }
        else {
            //filter node list
            newFilteredNodeList = nodeList.filter((node) => { if (currentFilteredNodeCountryList.includes(node.country)) { return node } });

        }
        setFilteredNodeList(newFilteredNodeList);
    }

    //button unclicked
    const button = {
        width: '150px',
        height: '150px',
        backgroundColor: 'transparent',
        color: 'white',
        border: '1.5px solid #000000',
        borderRadius: '5px',
        cursor: 'pointer'
    }

    //button clicked
    const buttonActive = {
        width: '150px',
        height: '150px',
        backgroundColor: '#808080',
        borderRadius: '5px',
        border: '1.5px solid #000000'
    }

    //button element
    const FlagButton = ({ country }) => (
        <>
            <button
                key={country}
                name={country}
                onClick={(event) => (handleFlagClick(event, country))}
                style={filteredNodeCountryList.includes(country) ? buttonActive : button}
            >
                <Image
                    width={120}
                    height={80}
                    src={`/${country}.png`}
                    alt={country}
                />
            </button>
        </>
    );

    //page html
  return (
      <div className="container">
      <Head>
        <title>Cheetahcoin Node Selector</title>
        <link rel="icon" href="/cheetahcoin.ico" />
      </Head>

      <main>
        <h1 className="title">
            <a href="https://cheetahcoin.org/">Cheetahcoin</a> Node Selector
        </h1>
              <div className="grid">
                  <div className="flagcard">
                      <h2>Select Country</h2>
                      <div className="flagcardcontainer">
                          {
                              nodeCountryList.map((country) => (
                                  <FlagButton
                                      country={country}
                                  />
                               ))
                          }
                      </div>
                  </div>
                  <div className="card">
                      <ClipboardCopy copyText={filteredNodeList} buttonText="Copy Config Friendly List" isNodeOutput="true" />
                      <h2> {filteredNodeList.length}/{nodes.length} Active Nodes </h2>
                      <h3> {`Current API Block: ${currentBlock}` }</h3>
                      {
                          
                          filteredNodeList.map((node) => (
                              <Node
                                  ipport={node.ipport}
                                  subver={node.subver}
                                  blocksfromcurrent={node.blocksfromcurrent}
                                  country={node.country}
                              />
                          ))
                      }
                  </div>
                  <div className="card">
                      <h2> Donate </h2>
                      <ClipboardCopy copyText={donateAddress} buttonText="Copy Donate Address" isNodeOutput="false" />
                  </div>

              </div>
          </main>

      <style jsx>{`
        .container {
          min-height: 100vh;
          padding: 0 0.5rem;
          display: flex;
          flex-direction: column;
          justify-content: center;
          align-items: center;
          flex-flow: column wrap;
        }

        main {
          padding: 5rem 0;
          flex: 1;
          display: flex;
          flex-direction: column;
          justify-content: center;
          align-items: center;
          flex-flow: column wrap;

        }

        a {
          color: inherit;
          text-decoration: none;
        }

        .title a {
          color: #0070f3;
          text-decoration: none;
        }

        .title {
          margin: 0;
          line-height: 1.15;
          font-size: 2.5rem;
        }

        .title,
        .description {
          text-align: center;
        }

        code {
          background: #fafafa;
          border-radius: 5px;
          padding: 0.75rem;
          font-size: 1.1rem;
          font-family: Menlo, Monaco, Lucida Console, Liberation Mono,
            DejaVu Sans Mono, Bitstream Vera Sans Mono, Courier New, monospace;
        }

        .grid {
          display: inline-flex;
          align-items: center;
          justify-content: center;
          flex-wrap: wrap;
          flex-direction: column;

          max-width: 4000px;
          margin-top: 3rem;
        }

        .card {
          flex: 1;
          flex-direction: column;
          margin: 1rem;
          flex-basis: 45%;
          padding: 1.5rem;
          text-align: center;
          color: inherit;
          justify-content: center;
          align-items: center;
          text-decoration: none;
          border: 2px solid #000000;
          border-radius: 10px;
          transition: color 0.15s ease, border-color 0.15s ease;
          background: rgb(255,255,255);
          background: rgba(255,255,255,0.5);
        }

        .flagcard {
          flex: 1;
          flex-basis: 50%;
          flex-direction: row;
          margin: 1rem;
          padding: 1.5rem;
          text-align: center;
          color: inherit;
          justify-content: center;
          flex-wrap: wrap;
          align-items: center;
          text-decoration: none;
          border: 2px solid #000000;
          border-radius: 10px;
          background-color: white;
          transition: color 0.15s ease, border-color 0.15s ease;
          background: rgb(255,255,255);
          background: rgba(255,255,255,0.5);
        }

        .copycard {
          flex: 1;
          flex-direction: column;
          margin: 1rem;
          flex-basis: 45%;
          padding: 1.5rem;
          text-align: center;
          color: inherit;
          justify-content: center;
          align-items: center;
          text-decoration: none;
          border: 2px solid #000000;
          border-radius: 10px;
          transition: color 0.15s ease, border-color 0.15s ease;
          flex-flow: center;
          background: rgb(255,255,255);
          background: rgba(255,255,255,0.5);
        }

      .copybutton:focus-visible {
        box-shadow: #222222 0 0 0 2px, rgba(255, 255, 255, 0.8) 0 0 0 4px;
        transition: box-shadow .2s;
      }
      
      .copybutton:active {
        background-color: #F7F7F7;
        border-color: #000000;
        transform: scale(.96);
      }
      
      .copybutton:disabled {
        border-color: #DDDDDD;
        color: #DDDDDD;
        cursor: not-allowed;
        opacity: 1;
      }

        .flagcardcontainer {
          display: inline-flex;
          flex: 1;
          flex-basis: 100%;
          flex-direction: row;
          margin: 1rem;
          padding: 1.5rem;
          text-align: center;
          color: inherit;
          justify-content: center;
          gap: 10px;
          flex-wrap: wrap;
          align-items: center;
          text-decoration: none;
          transition: color 0.15s ease, border-color 0.15s ease;
        }

        .card h2 {
          margin: 0 0 1rem 0;
          font-size: 2rem;
        }

        .card h3 {
          margin: 0 0 1rem 0;
          font-size: 1.5rem;
        }

        .flagcard h2 {
          margin: 0 0 1rem 0;
          font-size: 2rem;
        }

        .card p {
          margin: 0;
          font-size: 1.25rem;
          line-height: 1.5;
          font-weight: bold,
        }

        @media (max-width: 400px) {
          .grid {
            width: 100%;
            flex-direction: column;
          }
        }
      `}</style>

      <style jsx global>{`
        html,
        body {
          padding: 0;
          margin: 0;
          font-family: -apple-system, BlinkMacSystemFont, Segoe UI, Roboto,
            Oxygen, Ubuntu, Cantarell, Fira Sans, Droid Sans, Helvetica Neue,
            sans-serif;
          background-image: url(../background.jpg);
          background-position: center;
          background-repeat: no-repeat;
          background-size: cover;
        }

        * {
          box-sizing: border-box;
        }
      `}</style>
    </div>
  )
}

const propbagstyle = {
    display: 'inline-flex',
    flex: '1 20%',
    flexDirection: 'row',
    margin: '0rem',
    padding: '1.5rem',
    color: 'inherit',
    justifyContent: 'center',
    gap: '10px',
    flexWrap: 'nowrap',
    alignItems: 'baseline',
    textDecoration: 'none',
    fontSize: '1.25rem',
    transition: 'color 0.15s ease, border - color 0.15s ease'
}

const Node = ({ ipport, subver, blocksfromcurrent, country }) => (
    <>
        <div style={propbagstyle} >
            <div><Image src={`/${country}.png`} width={30} height={20} alt={country} /></div>
            <div>{ipport}</div>
            <div>{subver.substring(1,subver.length-1)}</div>
            <div>{blocksfromcurrent} blocks away</div>
        </div>
    </>
);

export async function getStaticProps()
{
    let nodes  = await getConnectedNodes();
    const nodeCountries = await getNodeCountries(nodes);
    const currentBlock = await getCurrentBlock();

    const blockHeightDifferenceLimit = 2000;

    const connectedNodes = nodes.filter((node) => { if (node.blocksfromcurrent < blockHeightDifferenceLimit) return node });

    return {
        props: {
            nodes,
            connectedNodes,
            nodeCountries,
            currentBlock
        }
    }
};