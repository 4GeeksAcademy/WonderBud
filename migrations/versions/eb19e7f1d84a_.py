"""empty message

Revision ID: eb19e7f1d84a
Revises: 
Create Date: 2024-04-18 16:20:58.667997

"""
from alembic import op
import sqlalchemy as sa


# revision identifiers, used by Alembic.
revision = 'eb19e7f1d84a'
down_revision = None
branch_labels = None
depends_on = None


def upgrade():
    # ### commands auto generated by Alembic - please adjust! ###
    op.create_table('event_type',
    sa.Column('id', sa.Integer(), nullable=False),
    sa.Column('name', sa.String(length=120), nullable=False),
    sa.PrimaryKeyConstraint('id')
    )
    op.create_table('user',
    sa.Column('id', sa.Integer(), nullable=False),
    sa.Column('email', sa.String(length=120), nullable=False),
    sa.Column('password', sa.String(length=80), nullable=False),
    sa.Column('is_active', sa.Boolean(), nullable=False),
    sa.PrimaryKeyConstraint('id'),
    sa.UniqueConstraint('email')
    )
    op.create_table('event',
    sa.Column('id', sa.Integer(), nullable=False),
    sa.Column('owner_id', sa.Integer(), nullable=False),
    sa.Column('name', sa.String(length=120), nullable=False),
    sa.Column('location', sa.String(length=250), nullable=False),
    sa.Column('start_datetime', sa.DateTime(), nullable=False),
    sa.Column('end_datetime', sa.DateTime(), nullable=False),
    sa.Column('status', sa.Enum('Planned', 'Completed', 'Canceled', 'In Progress', name='status'), nullable=False),
    sa.Column('description', sa.String(length=250), nullable=True),
    sa.Column('budget_per_person', sa.Float(), nullable=True),
    sa.Column('event_type_id', sa.Integer(), nullable=False),
    sa.ForeignKeyConstraint(['event_type_id'], ['event_type.id'], ),
    sa.ForeignKeyConstraint(['owner_id'], ['user.id'], ),
    sa.PrimaryKeyConstraint('id')
    )
    op.create_table('user__profile',
    sa.Column('user_id', sa.Integer(), nullable=False),
    sa.Column('name', sa.String(length=120), nullable=False),
    sa.Column('last_name', sa.String(length=120), nullable=False),
    sa.Column('birthdate', sa.Date(), nullable=False),
    sa.Column('location', sa.String(length=250), nullable=False),
    sa.Column('description', sa.String(length=500), nullable=False),
    sa.Column('profile_image', sa.String(length=250), nullable=False),
    sa.ForeignKeyConstraint(['user_id'], ['user.id'], ),
    sa.PrimaryKeyConstraint('user_id')
    )
    op.create_table('event__chat',
    sa.Column('id', sa.Integer(), nullable=False),
    sa.Column('chat_event_id', sa.Integer(), nullable=False),
    sa.Column('user_id', sa.Integer(), nullable=False),
    sa.Column('message', sa.String(length=250), nullable=False),
    sa.ForeignKeyConstraint(['chat_event_id'], ['event.id'], ),
    sa.ForeignKeyConstraint(['user_id'], ['user.id'], ),
    sa.PrimaryKeyConstraint('id')
    )
    op.create_table('event__member',
    sa.Column('id', sa.Integer(), nullable=False),
    sa.Column('event_id', sa.Integer(), nullable=False),
    sa.Column('user_id', sa.Integer(), nullable=False),
    sa.Column('status', sa.Enum('Joined', 'Rejected', 'Applied', 'Owner', 'Abandoned', name='status'), nullable=False),
    sa.ForeignKeyConstraint(['event_id'], ['event.id'], ),
    sa.ForeignKeyConstraint(['user_id'], ['user.id'], ),
    sa.PrimaryKeyConstraint('id')
    )
    op.create_table('petition__chat',
    sa.Column('id', sa.Integer(), nullable=False),
    sa.Column('chat_id_petition', sa.Integer(), nullable=False),
    sa.Column('user_id', sa.Integer(), nullable=False),
    sa.Column('event_id', sa.Integer(), nullable=True),
    sa.Column('message', sa.String(length=250), nullable=False),
    sa.ForeignKeyConstraint(['chat_id_petition'], ['user.id'], ),
    sa.ForeignKeyConstraint(['event_id'], ['event.id'], ),
    sa.ForeignKeyConstraint(['user_id'], ['user.id'], ),
    sa.PrimaryKeyConstraint('id')
    )
    # ### end Alembic commands ###


def downgrade():
    # ### commands auto generated by Alembic - please adjust! ###
    op.drop_table('petition__chat')
    op.drop_table('event__member')
    op.drop_table('event__chat')
    op.drop_table('user__profile')
    op.drop_table('event')
    op.drop_table('user')
    op.drop_table('event_type')
    # ### end Alembic commands ###
