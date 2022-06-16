import { prop as Property, getModelForClass, modelOptions} from '@typegoose/typegoose';
import { Field, ObjectType, ID } from 'type-graphql';

@ObjectType({description: 'The Model'})
@modelOptions({schemaOptions: {collection: 'minesweeper'}})
export class Minesweeper {
  @Field(() => ID)
  id: string;

  @Field()
  @Property({type: () => String, required: true })
  userName: string;

  @Field()
  @Property({type: () => String, required: true})
  level: string; 

  @Field()
  @Property({type: () => String, })

}
