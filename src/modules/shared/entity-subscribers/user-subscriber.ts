import {
  EntitySubscriberInterface,
  EventSubscriber,
  InsertEvent,
  UpdateEvent
} from "typeorm";

import { UserEntity } from "~/modules/core/user/user.entity";
import { UtilsService } from "~/providers/utils.service";

@EventSubscriber()
export class UserSubscriber implements EntitySubscriberInterface<UserEntity> {
  listenTo(): typeof UserEntity {
    return UserEntity;
  }
  beforeInsert(event: InsertEvent<UserEntity>): void {
    if (event?.entity?.salt) {
      event.entity.salt = UtilsService.generateHash(event.entity.salt);
    }
  }
  beforeUpdate(event: UpdateEvent<UserEntity>): void {
    if (event?.entity?.salt !== event?.databaseEntity?.salt) {
      event.entity.salt = UtilsService.generateHash(
        event.entity.salt as string
      );
    }
  }
}
