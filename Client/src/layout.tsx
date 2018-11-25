import * as React from "react";
import NavTopBar from "./components/NavTopBar";
import Navsiderbar from "./components/Navsiderbar";

export interface LayoutProps {
    children?: React.ReactNode
}
export class Layout extends React.Component<LayoutProps,{}> {
    render() {
        return (<div className="container-fluid">
        <NavTopBar/>
        <div className="row no-gutters">
            {/* 左右结构 */}
            <div className="col-2 col-md-3 col-sm-2">
             {/* 左导航条 */}
             <Navsiderbar/>
            </div>
            {/* 上下结构 */}
            <div className="col-10 col-md-9 col-sm-10 content_display">
             {this.props.children}
            </div>
        </div>
    </div>);
    }
}