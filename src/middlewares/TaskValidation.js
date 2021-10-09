const TaskModel = require('../model/TaskModel');
const { isPast } = require('date-fns');

const TaskValidation = async (req, res, next) => {

    const { macaddress, type, title, description, when } = req.body;

    if (!macaddress) {
        return res.status(400).json({ error: 'O macAddress é obrigatório!' });
    } else if (!type) {
        return res.status(400).json({ error: 'O tipo é obrigatório!' });
    } else if (!title) {
        return res.status(400).json({ error: 'O título é obrigatório!' });
    } else if (!description) {
        return res.status(400).json({ error: 'A descrição é obrigatório!' });
    } else if (!when) {
        return res.status(400).json({ error: 'A data é hora são obrigatórios!' });
    } else {
        let exists;

        if (req.params.id) {
            exists = await TaskModel.findOne({
                //ne = diferente
                '_id': { '$ne': req.params.id },
                'when': { '$eq': new Date(when) },
                'macaddress': { '$in': macaddress }
            });
        } else {
            if (isPast(new Date(when)))
                return res.status(400).json({ error: 'Escolha uma data e hora futura.' })
            exists = await TaskModel.findOne({
                //eq = igual
                'when': { '$eq': new Date(when) },
                'macaddress': { '$in': macaddress }
            });
        }

        if (exists) {
            return res.status(400).json({ error: 'Já existe uma tarefa nesse dia e horário.' });
        }

        next();
    }
}

module.exports = TaskValidation;