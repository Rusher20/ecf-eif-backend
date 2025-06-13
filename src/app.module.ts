import { Module } from '@nestjs/common';
import { GraphQLModule } from '@nestjs/graphql';
import { ApolloDriver, ApolloDriverConfig } from '@nestjs/apollo';
import { join } from 'path';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { RespondentModule } from './respondent/respondent.module';
import { StepResponseModule } from './step-response/step-response.module';

@Module({
  imports: [
    GraphQLModule.forRoot<ApolloDriverConfig>({
      driver: ApolloDriver,
      autoSchemaFile: join(process.cwd(), 'src/schema.gql'),
      playground: true,
      debug: true,
      context: ({ req }) => ({ req }),
    }),
    RespondentModule,
    StepResponseModule
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
