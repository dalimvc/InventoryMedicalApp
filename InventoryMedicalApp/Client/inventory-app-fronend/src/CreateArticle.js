import InsertBox from './InsertBox';
import { useState } from "react";
import { Table } from "react-bootstrap"; 

//component for creating a new article, it uses the InsertBox component for the form
const CreateArticle = () => {
    const [newArticle, setNewArticle] = useState(null);

    const handleAdd = (article) => {
        setNewArticle(article);
    };

    return (
        <div className="create-article">
            <InsertBox onAdd={handleAdd} />
            {newArticle && (
                <p>Framgång! Ny artikel tillagd:</p>

            )}
            {newArticle && (
                <div className="created-article-table">
                    <Table striped bordered hover responsive>
                        <thead className="table-primary">
                            <tr>
                                <th>Artikel</th>
                                <th>Antal i lager</th>
                                <th>Enhet</th>
                            </tr>
                        </thead>
                        <tbody>
                            <tr>
                                <td>{newArticle.namn}</td>
                                <td>{newArticle.antal}</td>
                                <td>{newArticle.enhet}</td>
                            </tr>
                        </tbody>
                    </Table>
                </div>
            )}
        </div>
    );
};

export default CreateArticle;
