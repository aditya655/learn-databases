import React from "react";
import {Suspense, lazy} from "react";
import {Switch, Route} from "react-router-dom";
const HomePage = lazy(() => import("./HomePage"));
const SchemaPage = lazy(() => import("./SchemaPage"));
const RelationalPage = lazy(() => import( "./RelationalPage"));

function Main(props) {
    return (
        <main>
            <Suspense fallback={"<div>Loading. Please be patient...</div>"}>
            <Switch>
                <Route exact path={"/"} component={HomePage}/>
                <Route exact path={"/relational"} component={RelationalPage}/>
                <Route exact path={"/schema"} component={SchemaPage}/>
            </Switch>
            </Suspense>
        </main>
    );
}

export  default Main;
 