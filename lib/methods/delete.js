var Arrow = require('arrow');

/**
 * Deletes the model instance.
 * @param {Arrow.Model} Model The model class being updated.
 * @param {Arrow.Instance} instance Model instance.
 * @param {Function} callback Callback passed an Error object (or null if successful), and the deleted model.
 */
exports['delete'] = function (Model, instance, callback) {
	var table = this.getTableName(Model),
		primaryKeyColumn = this.getPrimaryKeyColumn(Model),
		query = 'DELETE FROM ' + table + ' WHERE "' + primaryKeyColumn + '" = :id';

	if (!primaryKeyColumn) {
		return callback(new Arrow.ORMError('can\'t find primary key column for ' + table));
	}

	this._query(query, {id: instance.getPrimaryKey()}, callback, function (rows, result) {
		if (result && result.rowsAffected) {
			callback(null, instance);
		} else {
			callback();
		}
	});
};
