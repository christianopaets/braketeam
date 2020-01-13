import {EntitySchema, getConnection, ObjectType} from 'typeorm';

export function RepositoryInstance<Entity>(entity: ObjectType<Entity> | EntitySchema<Entity> | string) {
  return function(target: Object, propertyName: string) {
    Object.defineProperty(target, propertyName, {
      get: function() {
        return getConnection().getRepository(entity);
      }
    });
  };
}
