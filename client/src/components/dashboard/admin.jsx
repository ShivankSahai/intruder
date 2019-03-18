import React from 'react'
import SideBar from './question/bar'
import './question/style.css'
import Button from '@material-ui/core/Button';
import AceEditor from 'react-ace';
import 'brace/mode/asciidoc.js';
import 'brace/theme/twilight';

class App extends React.Component {
    render() {
        return (
            <div>
                <SideBar />
                <div id="panel" style={{ paddingTop: 20 }}>
                    <Button variant="contained" color="primary">
                        Admin Action
                    </Button>
                    <Button variant="contained" color="primary">
                        Admin Action
                    </Button><Button variant="contained" color="primary">
                        Admin Action
                    </Button><Button variant="contained" color="primary">
                        Admin Action
                    </Button>

                    <br /><br />
                    <AceEditor
                        cursor="slim"
                        mode="asciidoc"
                        fontSize={16}
                        height='200px'
                        width="100%"
                        theme="twilight"
                        // value={this.props.value}
                        // onChange={this.onChange.bind(this)}
                        name="UNIQUE_ID_OF_DIV"
                        editorProps={{ $blockScrolling: true }}
                        onLoad={(editor) => {
                            editor.getSession().setUseWrapMode(true);
                            editor.setReadOnly(true)
                        }}
                    />
                </div>
            </div>
        )
    }
}

export default App
